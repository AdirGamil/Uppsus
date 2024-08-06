const { useState } = React
import { mailService } from "../services/mail.service.js"
const { useNavigate } = ReactRouterDOM

export function MailNavigation({ unreadCount, setSearch, hamburgerOpen }) {
    const [folderSelected, setFolderSelected] = useState('inbox')
    const navigate = useNavigate()

    function linkToList() {
        navigate(`/mail`)
    }

    function onFolderClick(folderName) {
        setFolderSelected(folderName)
        setSearch(mailService.setFolder(folderName))
        linkToList()
    }

    return (
        <ul className="mail-navigation-list clean-ul">
            <li>
                <button
                    onClick={() => onFolderClick('inbox')} 
                    title="inbox"
                    className={`${folderSelected === 'inbox' ? 'selected' : ''} ${hamburgerOpen ? '' : 'hambuger-closed'}`}>
                    <div className="material-icons icon">inbox</div>
                    <div className={`folder inbox ${hamburgerOpen ? '' : 'hambuger-closed'}`}>Inbox
                        <span className="unread-count" title="Unread">{unreadCount}</span>
                    </div>

                </button>
            </li>

            <li>
                <button onClick={() => onFolderClick('starred')} title="Starred"
                    className={`${folderSelected === 'starred' ? 'selected' : ''} ${hamburgerOpen ? '' : 'hambuger-closed'}`}>
                    <span className="material-icons icon">star_outline</span>
                    <div className={`folder star ${hamburgerOpen ? '' : 'hambuger-closed'}`}>Starred</div>
                </button>
            </li>

            <li>
                <button onClick={() => onFolderClick('sent')} title="Sent"
                    className={`${folderSelected === 'sent' ? 'selected' : ''} ${hamburgerOpen ? '' : 'hambuger-closed'}`}>
                    <span className="material-icons icon">send</span>
                    <div className={`folder sent ${hamburgerOpen ? '' : 'hambuger-closed'}`}>Sent</div>
                </button>
            </li>

            <li>
                <button onClick={() => onFolderClick('drafts')} title="Drafts"
                    className={`${folderSelected === 'drafts' ? 'selected' : ''} ${hamburgerOpen ? '' : 'hambuger-closed'}`}>
                    <span className="material-icons icon">note</span>
                    <div className={`folder drafts ${hamburgerOpen ? '' : 'hambuger-closed'}`}>Drafts</div>
                </button>

            </li>

            <li>
                <button onClick={() => onFolderClick('bin')} title="Bin"
                    className={`${folderSelected === 'bin' ? 'selected' : ''} ${hamburgerOpen ? '' : 'hambuger-closed'}`}>
                    <span className="material-symbols-outlined icon">delete</span>
                    <div className={`folder trash ${hamburgerOpen ? '' : 'hambuger-closed'}`}>Bin</div>
                </button>
            </li>
        </ul>
    )
}