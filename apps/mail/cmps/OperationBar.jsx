export function OperationsBar({ deleteMail, toggleIsRead, mail }) {

    function onClickDeleteMail(ev) {
        ev.stopPropagation()
        deleteMail(mail)
    }

    function onClickToggleUnread(ev) {
        ev.stopPropagation()
        toggleIsRead(mail)
    }

    return (
        <div className="operations-bar hidden">
            <div className="mail-preview mail-operation read-unread icon-hover" onClick={onClickToggleUnread}>
                {mail.isRead ?
                    <span className="material-symbols-outlined" title="Mark as Read">mark_email_unread</span> :
                    <span className="material-symbols-outlined" title="Mark as Unread">drafts</span>}
            </div>

            <div className="mail-preview mail-operation delete icon-hover" onClick={onClickDeleteMail}>
                <span className="material-symbols-outlined" title="Delete">delete</span>
            </div>
        </div>
    )
}

