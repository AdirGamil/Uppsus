// services
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

// jsx components
import { OperationsBar } from "./OperationBar.jsx"

// react
const { useState } = React



export function MailPreview({ mail, deleteMail, toggleIsRead, link }) {

    const [starred, setStarred] = useState(mail.starred)
    const [selected, setSelected] = useState(false)

    function toggleStarred(ev, mail) {
        ev.stopPropagation()
        setStarred(prevStarred => !prevStarred)
        mail.starred = !mail.starred
        mailService.save(mail)
            .catch(() => {
                mail.starred = !mail.starred
                setStarred(prevStarred => !prevStarred)
            })
    }

    function toggleSelected(ev) {
        ev.stopPropagation()
        setSelected(prevSelected => !prevSelected)
    }

    function linkToMessege() {
        link(mail.id)
    }

    return (
        <React.Fragment>
            <article className={`list-row ${mail.isRead ? 'read' : 'unread'} ${selected ? 'selected' : ''}`} onClick={linkToMessege}>
                {/* starred */}
                <button
                    className="mail-preview mail-operation material-icons"
                    onClick={(ev) => toggleSelected(ev)}
                    title="Select">{selected ? 'check' : 'check_box_outline_blank'}
                </button>

                {/* selected */}
                <button 
                className={`mail-preview mail-operation material-icons ${starred ? 'starred' : ''}`} 
                onClick={(ev) => toggleStarred(ev, mail)}
                title="Star">{starred ? 'star' : 'star_outline'}
                </button>

                {/* mail origin */}
                <div className="mail-preview from">
                    {mail.senderName}
                </div>


                {/* mail subject */}

                <div className="mail-preview-text-contents">
                    <div className="mail-preview subject"><p className="subject">{mail.subject}</p></div>
                    <div className="mail-preview body mail-font-regular"><p className="body">&nbsp;-&nbsp;{mail.body}</p></div>
                </div>

                {/* mail time stamp */}
                <div className={`mail-preview sentAt`}>
                    {utilService.getTimeDisplay(mail.sentAt)}
                </div>

                {/* mail operations */}
                <div>
                    <OperationsBar
                        deleteMail={deleteMail}
                        toggleIsRead={toggleIsRead}
                        mail={mail} />
                </div>
            </article>
        </React.Fragment>
    )
}