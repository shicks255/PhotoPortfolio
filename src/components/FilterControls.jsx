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

    render()
    {
        let tags = this.props.allTags
            .filter(t => t.toLowerCase().includes(this.state.tempTagSearch.toLowerCase()));

        let tagList = tags.map(t => {
            return <li data-id={t} onClick={this.clickTag}  className={'list-group-item'} key={t}>
                {t}
            </li>
        });

        let selectedTag = this.state.tagToSearch.length > 0 ?
            <span>
                Photos tagged with:
                <span href={'#'} className={'badge badge-pill badge-primary'}>
                    {this.state.tagToSearch}&nbsp;
                    <span className={'oi oi-x'} title={'x'} ></span>
                </span>
            </span> : '';

        const form =
            <div>
                <form>
                    <div className={'form-group'} onFocus={this.showTags} onBlur={this.hideTags}>
                        <label htmlFor={''}>Tag:</label>
                        <input onChange={this.onFormChange}
                               type={''}
                               className={'form-control'}
                               aria-describedby={''}
                               value={this.state.tempTagSearch}>
                        </input>
                        <div id={'tagComboBox'} className={'tag-searcher invisible'}>
                            <ul className={'list-group'}>
                                {tagList}
                            </ul>
                        </div>
                        <small id={''} className={'form-text text-muted'}>Test</small>
                    </div>
                    <button type={'submit'} className={'btn btn-primary'}>
                        Filter
                    </button>
                </form>
                {selectedTag}
            </div>
        return form;
    }
}