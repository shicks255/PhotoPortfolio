import React from 'react';
import $ from "jquery";

export default class FilterControls extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            tempTagSearch: '',
            tagToSearch: ''
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
        this.setState({
            tempTagSearch: '',
            tagToSearch: tag
        });
        this.props.onTagClick(tag);
    }

    clearTag() {
        this.setState({
            tempTagSearch: '',
            tagToSearch: ''
        });
        this.props.onTagClick('');
    }

    render()
    {
        let tags = this.props.allTags
            .filter(t => t.toLowerCase().includes(this.state.tempTagSearch.toLowerCase()));

        let tagList = tags.map(t => {
            return <li data-id={t} onClick={this.clickTag}  className={'list-group-item pointer'} key={t}>
                {t}
            </li>
        });

        let selectedTag = this.state.tagToSearch.length > 0 ?
            <span>
                <h2>
                    Currently showing photos tagged with
                    <span href={'#'} className={'badge badge-pill badge-primary'}>
                        {this.state.tagToSearch}&nbsp;
                        <span onClick={this.clearTag} className={'oi oi-x pointer'} title={'x'} ></span>
                    </span>
                </h2>
            </span> : '';

        const form =
            <div className={'filterControls'}>
                {selectedTag}
                <form>
                    <div className={'form-group'} onFocus={this.showTags} onBlur={this.hideTags}>
                        <label htmlFor={'tagToSearch'}>Search for a photo Tag:</label>
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