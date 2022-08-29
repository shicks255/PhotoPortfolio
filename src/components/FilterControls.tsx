import React, { useState } from 'react';

import { ITag } from 'models/Photo';

interface IProps {
  allTags: string[];
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterControls: React.FC<IProps> = (props: IProps) => {
  const { allTags, setTags, tags } = props;
  const [tempTagSearch, setTempTagSearch] = useState('');

  const showTags = () => {
    document.getElementById('tagComboBox')?.classList.add('visible');
    document.getElementById('tagComboBox')?.classList.remove('invisible');
  };

  const hideTags = () => {
    setTimeout(() => {
      document.getElementById('tagComboBox')?.classList.add('invisible');
      document.getElementById('tagComboBox')?.classList.remove('visible');
    }, 150);
  };

  const onFormChange = (e) => {
    setTempTagSearch(e.target.value);
  };

  const clickTag = (t) => {
    setTags((val: string[]) => {
      val.push(t);
      return [...val];
    });
    setTempTagSearch('');
  };

  const clearTag = (name) => {
    setTags((val: string[]) => {
      const newList = val.filter((tag) => tag != name);
      return [...newList];
    });
  };

  const tagList = allTags
    .filter((t) => t.toLowerCase().includes(tempTagSearch.toLowerCase()))
    .filter((t) => !tags.includes(t))
    .map((tag) => {
      return (
        <li
          onClick={() => clickTag(tag)}
          className={'cursor-pointer w-full hover:bg-violet-200'}
          key={tag}
        >
          {tag}
        </li>
      );
    });

  const tagsToDisplay = tags.map((t) => {
    return (
      <div key={t} className="py-2 px-5 m-1 bg-slate-700 text-violet-200 rounded-full w-22 inline">
        {t}&nbsp;
        <span onClick={() => clearTag(t)} className={'oi oi-x cursor-pointer'} title={'x'} />
      </div>
    );
  });

  const selectedTag =
    tags.length > 0 ? (
      <span>
        <h2>Currently showing photos tagged with</h2>
        <div className="mt-1 mb-2 p-2">{tagsToDisplay}</div>
      </span>
    ) : (
      ''
    );

  return (
    <div className={'filterControls bg-violet-200'}>
      {selectedTag}
      <form>
        <div className={'form-group relative'}>
          <label className={'p-2 font-bold mb-0 text-slate-800'}>
            <i className={'fas fa-search mr-2'}></i>
            Search for photos by a tag
          </label>
          <input
            id={'tagToSearch'}
            onChange={onFormChange}
            type={'text'}
            className={'form-control w-full'}
            aria-describedby={''}
            value={tempTagSearch}
            autoComplete="off"
            onFocus={showTags}
            onBlur={hideTags}
          />
          <ul
            id="tagComboBox"
            className={'absolute invisible w-full z-50 bg-slate-100 max-h-80 overflow-auto'}
          >
            {tagList}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default FilterControls;
