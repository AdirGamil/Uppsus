// +-+-+-+-+-+-+-+-+-+-+-+-  imports  +-+-+-+-+-+-+-+-+-+-+-+- // 
// services
import { mailService } from '../services/mail.service.js'
mailService.generateDemoMails()

// jsx components
import { MailList } from '../cmps/MailList.jsx'
import { MailNavigation } from '../cmps/MailFolderList.jsx'
import { MailSearch } from '../cmps/MailSearch.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

// react
const { useEffect, useState } = React

export function MailIndex() {
    // --- hooks ---
    // states
    const [mails, setMails] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [searchPattern, setSearchPattern] = useState(mailService.getFilterBy())
    const [sideBarOpen, setSideBarOpen] = useState(true)

    // effects
    useEffect(() => {
        mailService.setFilterBy(searchPattern)  // in service not async
        mailService.query()
            .then(mails => {
                setMails(mails)
                setUnreadCount(mailService.getUnreadMark())

            })
    }, [searchPattern])

    // count unraed
    useEffect(() => {
        setUnreadCount(mailService.getUnreadMark())
    }, [mails])
    // --- hooks end ---

    function countUnread() {
        return mails.reduce((acc, mail) => {
            acc = mail.isRead ? acc + 1 : acc
            return acc
        }, 0)
    }

    // delete mail
    function deleteMail(mail) {
        if (!mail.removedAt) {
            const newMail = { ...mail, ['removedAt']: Date.now() }
            mailService.save(newMail)
                .then(() => setSearchPattern(prev => ({ ...prev })))
        }

        else {
            mailService.remove(mail.id)
                .then(() => setSearchPattern(prev => ({ ...prev })))
                .catch(() => console.log('cannot remove'))
        }
    }

    // read/unread mail
    function toggleIsRead(mail) {
        mail.isRead = !mail.isRead
        mailService.save(mail)
            .then(() => setSearchPattern(prev => ({ ...prev })))
            .catch(() => {
                mail.isRead = !mail.isRead
            })
    }

    // add mail
    function sendMail({ to, subject, body, createdAt, isDraft = false }) {
        const mail = mailService.createSentMail({ to, subject, body, createdAt, isDraft })
        mailService.save(mail)
            .then(() => setSearchPattern(prev => ({ ...prev })))
    }

    return (
        <section className="mail-index">
            {/* search bar */}
            <div className='search-bar'>

                {/* hamburger */}
                <button className="material-icons mail-humburger" title='Main Menu' onClick={() => setSideBarOpen(prev => !prev)}>menu</button>

                {/* logo */}
                <img className='mail-logo' src="./assets/img/gmail-logo.png" alt="" />

                {/* search */}
                <MailSearch
                    prevPattern={searchPattern}
                    setPrevPattern={setSearchPattern} />
            </div>

            {/* side bar */}
            <div className='side-bar'>

                {/* new email */}
                <MailCompose
                    sendMail={sendMail}
                    hamburgerOpen={sideBarOpen} />

                {/* sidebars folders */}
                <MailNavigation
                    hamburgerOpen={sideBarOpen}
                    setSearch={setSearchPattern}
                    unreadCount={unreadCount} />
            </div>

            {/* preview list */}
            <div className="previews-conrainer">
                <MailList
                    setSearch={setSearchPattern}
                    setMails={setMails}
                    mails={mails}
                    deleteMail={deleteMail}
                    toggleIsRead={toggleIsRead} />
            </div>
        </section>
    )
}