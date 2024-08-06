const {useState } = React

export function MailCategories({setSearch}) {
    const [selected, setSelected] = useState('primery')

    function setCategorie(categorie) {
        setSelected(categorie)
        setSearch(prevP => {
            return { ...prevP, ['categorie']: categorie }
        })
    }

    return (
        <ul className="mail-categories clean-ul">
            {/* Primary */}
            <button className={`mail-categorie ${selected === 'primery' ? 'selected' : ''}`}
            onClick={() => setCategorie('primery')}>
                <div className="material-icons icon primery">inbox</div>
                <span>Primary</span>
            </button>

            {/* promotion */}
            <button className={`mail-categorie ${selected === 'promotions' ? 'selected' : ''}`}
            onClick={() => setCategorie('promotions')}>

                <div className="material-icons icon promotions">loyalty</div>
                <span>Promotions</span>
            </button>

            {/* Social  */}
            <button className={`mail-categorie ${selected === 'social' ? 'selected' : ''}`}
            onClick={() => setCategorie('social')}>
                <div className="material-icons icon social">group</div>
                <span>Social</span>
            </button>
        </ul>
    )
}