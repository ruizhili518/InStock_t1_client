import search from '../../assets/icons/search-24px.svg';
import './Search.scss';

function Searchbar() {
    return (
        <form className="searchbar">
            <input className="searchbar__input" type="search" placeholder="Search...">
            </input>
            <button className="searchbar__button"><img className="searchbar__icon" src={search} /></button>
        </form>
    )
}

export default Searchbar;