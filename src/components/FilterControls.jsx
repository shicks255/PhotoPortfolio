import React from 'react';
import $ from "jquery";

export default class FilterControls extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            tempTagSearch: '',
            tagsToSearch: [],
        }

        this.onFormChange = this.onFormChange.bind(this);
        this.clickTag = this.clickTag.bind(this);
        this.hideTags = this.hideTags.bind(this);
        this.clearTag = this.clearTag.bind(this);
    }

    showTags() {
        $( '#tagComboBox' ).addClass('visible').removeClass('invisible');
    }

    hideTags() {
        setTimeout( () => {
            $( '#tagComboBox' ).addClass('invisible').removeClass('visible');
        }, 150);
    }

    onFormChange(e) {
        this.setState({
            tempTagSearch: e.target.value
        });
    }

    clickTag(e) {
        let tag = e.currentTarget.dataset.id;
        let tags = this.state.tagsToSearch;
        tags.push(tag);
        this.setState({
            tempTagSearch: '',
            tagsToSearch: tags,
        });
        this.props.onTagClick(tags);
    }

    clearTag(e) {
        let tag = e.currentTarget.dataset.id;
        this.state.tagsToSearch.splice(this.state.tagsToSearch.indexOf(tag), 1);

        this.props.onTagClick(this.state.tagsToSearch);
    }

    render()
    {
        let tags = this.props.allTags
            .filter(t => t.toLowerCase().includes(this.state.tempTagSearch.toLowerCase()))
            .filter(t => !this.state.tagsToSearch.includes(t));

        let tagList = tags.map(t => {
            return <li data-id={t} onClick={this.clickTag}  className={'list-group-item pointer'} key={t}>
                {t}
            </li>
        });

        let tagsToDisplay = this.state.tagsToSearch.map(t => {
            return(
                <span key={t} className={'badge badge-pill badge-primary'}>
                    {t}&nbsp;
                    <span data-id={t} onClick={this.clearTag} className={'oi oi-x pointer'} title={'x'} ></span>
                </span>
            )
        })
        let selectedTag = this.state.tagsToSearch.length > 0 ?
            <span>
                <h2>
                    Currently showing photos tagged with
                    {tagsToDisplay}
                </h2>
            </span> : '';

        const form =
            <div className={'filterControls'}>
                {selectedTag}
                <form>
                    <div className={'form-group'} onFocus={this.showTags} onBlur={this.hideTags}>
                        <label className={'label'} htmlFor={'tagToSearch'}>
                            <i className={'fas fa-search'}></i>
                            &nbsp;
                            Search for photos by a tag:
                        </label>
                        <input id={'tagToSearch'}
                               onChange={this.onFormChange}
                               type={'text'}
                               className={'form-control'}
                               aria-describedby={''}
                               value={this.state.tempTagSearch}>
                        </input>
                        <div id={'tagComboBox'} className={'tag-searcher invisible'}>
                            <ul className={'list-group'}>
                                {tagList}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        return form;
    }
}