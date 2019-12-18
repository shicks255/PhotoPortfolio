import React from 'react';

export default class FilterControls extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let tagList = this.props.filteredTags.map(t => {
            return <li data-id={t} onClick={this.props.onTagClick}  className={'list-group-item'} key={t}>
                {t}
            </li>
        });

        const form =
            <form onSubmit={this.props.onFormSubmit}>
            <div className={'form-group'} onFocus={this.props.onFocus} onBlur={this.props.onBlur}>
                <label htmlFor={''}>Tag:</label>
                <input onChange={this.props.onFormChange}
                       type={''}
                       className={'form-control'}
                       aria-describedby={''}
                       value={this.props.tempTagSearch}>
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

        return form;
    }
}