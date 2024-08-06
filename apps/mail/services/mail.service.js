'use strict'
// imports
import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const mailService = {
    query,
    get,
    remove,
    save,
    getFilterBy,
    setFilterBy,
    getNextMailId,
    generateDemoMails,
    createSentMail,
    getUserName,
    getUserMail,
    setFolder,
    getUnreadMark,
}

// +-+-+-+-+-+-+-+-+-+-+-+-  globals  +-+-+-+-+-+-+-+-+-+-+-+- // 
const MAILS_LCS_KEY = 'MAILS_LCS_KEY'
const USER_IDENTIFIERS = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
const CATEGORIES = ['primery', 'promotions', 'social']
let gUnraedCount = 0

const MAX_PER_PAGE = 50
let gFilterBy = {
    subject: '',
    inbox: true,
    starred: false,
    sent: false,
    drafts: false,
    bin: false,
    categorie: 'primery'
}

let gDefaultFalse = {
    inbox: false,
    starred: false,
    sent: false,
    drafts: false,
    bin: false,
}

// +-+-+-+-+-+-+-+-+-+-+-+- data queries +-+-+-+-+-+-+-+-+-+-+-+-//

function getUnreadMark() {
    return gUnraedCount
}

function setFolder(folderName = 'inbox') {
    gFilterBy = {
        ...gDefaultFalse,
        ['subject']: gFilterBy.subject,
        ['categorie']: gFilterBy.categorie,
        [folderName]: true
    }
    // if (folderName === 'all') gFilterBy = { ...gDefaultFalse, ['subject']: '' }
    return gFilterBy
}

function query() {
    return storageService.query(MAILS_LCS_KEY)
        .then(mails => {
            gUnraedCount = mails.reduce((acc, mail) => {
                if (mail.to === USER_IDENTIFIERS.email && !mail.removedAt && mail.sentAt && !mail.isRead) acc += 1
                return acc
            }, 0)

            if (gFilterBy.subject) {
                const regex = new RegExp(gFilterBy.subject, 'i')
                mails = mails.filter(mail => regex.test(mail.subject))
            }

            // folders
            if (gFilterBy.inbox) {
                mails = mails.filter(mail => (mail.to === USER_IDENTIFIERS.email && !mail.removedAt && mail.sentAt))
            }

            if (gFilterBy.starred) {
                mails = mails.filter(mail => mail.starred)
            }

            if (gFilterBy.sent) {
                mails = mails.filter(mail => (mail.from === USER_IDENTIFIERS.email && mail.sentAt))
            }

            if (gFilterBy.bin) {
                mails = mails.filter(mail => !!mail.removedAt)
            }


            if (gFilterBy.drafts) {
                mails = mails.filter(mail => !mail.sentAt)
            }

            if (gFilterBy.categorie) {
                mails = mails.filter(mail => mail.categorie === gFilterBy.categorie)
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAILS_LCS_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAILS_LCS_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAILS_LCS_KEY, mail)  // AKA update element
    } else {
        return storageService.post(MAILS_LCS_KEY, mail) // AKA add new element
    }
}

function getFilterBy() {   // copoy of filters
    return { ...gFilterBy }
}

function setFilterBy(filterBy) {
    gFilterBy = { ...filterBy }

    return gFilterBy
}

function getNextMailId(mailId) {
    return storageService.query(MAILS_LCS_KEY)
        .then(mails => {
            let nextMailIdx = mails.findIndex(car => car.id === mailId) + 1
            return mails[nextMailIdx % mails.length].id
        })
}

function createSentMail({ to, subject, body, createdAt, isDraft = false, id = undefined }) {
    return {
        id,
        starred: false,
        createdAt,
        subject,
        body,
        isRead: true,
        sentAt: isDraft ? null : Date.now(),
        removedAt: null,
        from: USER_IDENTIFIERS.email,
        senderName: USER_IDENTIFIERS.fullname,
        to,
        categorie: CATEGORIES[0]  // primery
    }
}

function getUserName() {
    return USER_IDENTIFIERS.fullname
}

function getUserMail() {
    return USER_IDENTIFIERS.email
}

// +-+-+-+-+-+-+-+-+-+-+-+- demo data +-+-+-+-+-+-+-+-+-+-+-+-//
function generateDemoMails(mailCount = 400) {
    // check if there are any mails im lcl storage
    let mails = utilService.loadFromStorage(MAILS_LCS_KEY)
    if (!(!mails || !mails.length)) return

    // else, create demo data
    let curIdNum = 0
    mails = []

    // Incoming emails
    for (let i = 0; i < mailCount * 0.75; ++i) {
        mails.push(_generateUserRandomEmail(`e${curIdNum++}`))
    }

    // outgoing emails
    for (let i = 0; i < mailCount * 0.25; ++i) {
        mails.push(_generateUserRandomEmail(`e${curIdNum++}`, true))
    }

    mails.sort((m1, m2) => m2.sentAt - m1.sentAt)
    // store in lcs
    utilService.saveToStorage(MAILS_LCS_KEY, mails)
}

function _generateUserRandomEmail(id, userEmails = false) {
    const twoYears = 60 * 60 * 24 * 365 * 2 * 1000
    const onWeek = 60 * 60 * 24 * 7 * 1000
    const today = Date.now()
    const sentAt = utilService.getRandomIntInclusive(today - twoYears, today)
    return {
        id,
        starred: Math.random() > 0.8 ? true : false,
        createdAt: Math.random() > utilService.getRandomIntInclusive(sentAt - onWeek, sentAt),
        subject: _generateRandomEmailSubject(),
        body: _generateRandomEmailBody(),
        isRead: userEmails ? true : Math.random() > 0.4 ? true : false,
        sentAt,
        removedAt: Math.random() > 0.3 ? null : utilService.getRandomIntInclusive(sentAt, today),
        from: userEmails ? USER_IDENTIFIERS.email : _generateRandomEmailAddress(),
        senderName: userEmails ? USER_IDENTIFIERS.fullname : generateRandomName(),
        to: !userEmails ? USER_IDENTIFIERS.email : _generateRandomEmailAddress(),
        categorie: userEmails ? CATEGORIES[0] : CATEGORIES[utilService.getRandomIntInclusive(0, 2)]
    }
}

function _generateRandomEmailSubject() {
    const adjectives = ['Important', 'Urgent', 'New', 'Updated', 'Final', 'Weekly', 'Monthly'];
    const nouns = ['Project', 'Meeting', 'Update', 'Report', 'Reminder', 'Schedule', 'Agenda'];
    const phrases = ['for Review', 'Regarding Your Request', 'Action Required', 'Details Inside', 'Follow-Up Needed', 'for Approval', 'FYI'];

    // Helper function to get a random element from an array
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Generate a random subject
    const subject = `${getRandomElement(adjectives)} ${getRandomElement(nouns)} ${getRandomElement(phrases)}`;
    return subject;
}

function generateRandomName() {
    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const firstNames = [
        "John", "Jane", "Alex", "Emily", "Chris", "Katie", "Michael", "Sarah", "David", "Laura",
        "Robert", "Linda", "James", "Karen", "Charles", "Barbara", "Joseph", "Jennifer", "Thomas", "Jessica"
    ];

    const lastNames = [
        "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
        "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"
    ];

    const prefixes = [
        "Tech", "Global", "Innovative", "Advanced", "NextGen", "Creative", "Dynamic", "Future", "Vision", "Pioneer"
    ];

    const suffixes = [
        "Solutions", "Enterprises", "Systems", "Technologies", "Consulting", "Holdings", "Networks", "Ventures", "Corp", "LLC"
    ];

    const adjectives = [
        "Cool", "Awesome", "Great", "Amazing", "Fantastic", "Incredible", "Marvelous", "Wonderful", "Superb", "Fabulous"
    ];

    const nouns = [
        "Tech", "Gadgets", "Tools", "Gear", "Devices", "Widgets", "Apps", "Software", "Hardware", "Gizmos"
    ];

    // Randomly choose between generating a full name, organization name, or website name
    const choice = Math.floor(Math.random() * 3);

    switch (choice) {
        case 0:
            // Generate full name
            const firstName = getRandomElement(firstNames);
            const lastName = getRandomElement(lastNames);
            return `${firstName} ${lastName}`;
        case 1:
            // Generate organization name
            const prefix = getRandomElement(prefixes);
            const suffix = getRandomElement(suffixes);
            return `${prefix} ${suffix}`;
        case 2:
            // Generate website name
            const adjective = getRandomElement(adjectives);
            const noun = getRandomElement(nouns);
            return `${adjective}${noun}.com`.toLowerCase();
    }
}

function _generateRandomEmailBody() {
    const introPhrases = [
        "I hope this email finds you well.",
        "Greetings!",
        "Hello!",
        "Hi there,",
        "Dear team,",
        "Hi [Recipient's Name],",
        "Good day!"
    ];

    const bodySentences = [
        "I wanted to remind you about the meeting tomorrow.",
        "Please review the attached document.",
        "We have an important update regarding the project.",
        "Your feedback is highly appreciated.",
        "Looking forward to your response.",
        "Don't forget about our upcoming event.",
        "Thank you for your time and consideration.",
        "Please let me know if you have any questions.",
        "The deadline is approaching quickly.",
        "We appreciate your feedback.",
        "Here's the information you requested.",
        "Best wishes for a great day.",
        "Can you please provide an update?",
        "Your attention to this matter is required.",
        "Please make sure to complete the assigned tasks.",
        "We are pleased with the progress so far.",
        "I have a few questions regarding the project.",
        "Can we schedule a meeting to discuss further?",
        "I have attached the latest report for your review.",
        "Please find the details in the attached document.",
        "I would like to bring to your attention the following points.",
        "Thank you for your cooperation.",
        "We need to finalize the details by the end of the week.",
        "Your prompt response is greatly appreciated.",
        "I hope you are doing well.",
        "Please let me know your thoughts on this matter."
    ];

    const closingPhrases = [
        "Thank you!",
        "Best regards,",
        "Sincerely,",
        "Kind regards,",
        "Best wishes,",
        "Warm regards,",
        "Yours truly,"
    ];

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Generate random introductory phrase
    const randomIntro = getRandomElement(introPhrases);

    // Generate a longer random body with more sentences
    const randomBodySentences = [];
    const sentenceCount = Math.floor(Math.random() * 5) + 5; // Between 5 and 10 sentences
    for (let i = 0; i < sentenceCount; i++) {
        randomBodySentences.push(getRandomElement(bodySentences));
    }
    const randomBody = randomBodySentences.join(" ");

    // Generate random closing phrase
    const randomClosing = getRandomElement(closingPhrases);

    // Combine all parts into a single email body
    const emailBody = `${randomIntro}\n\n${randomBody}\n\n${randomClosing}\n[Your Name]`;

    return emailBody;
}

function _generateRandomEmailAddress() {
    const domains = ['example.com', 'test.com', 'demo.com', 'email.com', 'mail.com'];
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let email = '';

    // Generate the username part of the email (5 to 10 characters long)
    const usernameLength = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < usernameLength; i++) {
        email += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Add the '@' symbol
    email += '@';

    // Choose a random domain from the list
    email += domains[Math.floor(Math.random() * domains.length)];
    return email;
}