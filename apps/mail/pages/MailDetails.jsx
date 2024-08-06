// react
const { useParams } = ReactRouterDOM
const { useState, useEffect } = React
const { useNavigate, useLocation } = ReactRouterDOM

// services
import { mailService } from '../services/mail.service.js'


export function MailDetails() {
    // --- hooks ---
    // mail object
    const [mail, setMail] = useState(null)

    // mail id
    const params = useParams();

    // navigation
    const navigate = useNavigate()

    //  effect
    useEffect(() => {
        mailService.get(params.id)
            .then(mail => {
                const newMail = { ...mail, ['isRead']: true }
                mailService.save(newMail)
                    .then(setMail(newMail))
                    .catch(_ => {
                        navigate('/mail')
                    })
            })
    }, [])
    // --- hooks end ---

    function removeMail() {
        const newMail = { ...mail, ['removedAt']: Date.now() }
        mailService.save(newMail)
            .then(() => navigate('/mail', { state: { reload: mail.id } }))
            .catch(() => console.log('cannot remove'))
    }

    if (!mail) return
    return (
        <article className="mail-details container">

            {/* mail subject */}
            <div className="mail-details subject">
                {mail.subject}
            </div>

            <button className='mail-details remove material-symbols-outlined' onClick={removeMail}>delete</button>

            {/* mail origin */}
            <div className="mail-details origin">
                <span className="mail-details sender-name">{mail.senderName}</span>
                <span className="mail-details sender-mail">{' <'}{mail.from}{'>'}</span>
            </div>

            {/* mail destenation */}
            <div className="mail-details to">
                {`to ${mail.to === mailService.getUserMail() ? 'me' : mail.to}`}
            </div>

            <div className="mail-details body">
                {mail.body}
            </div>

        </article>
    )
}
