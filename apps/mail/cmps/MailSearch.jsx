export function MailSearch({ prevPattern, setPrevPattern }) {

    function onChangePattern({ target }) {
        setPrevPattern(prevP => {
            return { ...prevP, ['subject']: target.value }
        })
    }

    return (
        <div className="search-input">
            <span className="material-icons">search</span>
            <input type="text" value={prevPattern.subject} placeholder="Search mail" onChange={onChangePattern} />
        </div>
    )
}

