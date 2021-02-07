import { BlockTool, API, BlockToolData } from '@editorjs/editorjs';
import React from 'react';
import ReactDOM from 'react-dom';

import { Selector } from './Selector';

interface MoveData extends BlockToolData {
  characterSlug?: string;
  moveId?: string;
}

export class Move implements BlockTool {
  wrapperDiv: HTMLDivElement = document.createElement('div');
  api: API;
  data: MoveData;

  static get toolbox() {
    return {
      title: '技データ',
      icon: '<span class="icf icf_lp_rp"></span>',
    };
  }

  constructor({ api, data }: { api: API; data: MoveData }) {
    this.data = data;
    this.api = api;
  }

  render(): HTMLElement {
    ReactDOM.render(
      React.createElement(Selector, {
        moveId: this.data.moveId,
        characterSlug: this.data.characterSlug,
        onChangeCharacter: characterSlug => {
          this.data.characterSlug = characterSlug;
        },
        onChangeMove: moveId => {
          this.data.moveId = moveId;
        },
      }),
      this.wrapperDiv,
    );
    return this.wrapperDiv;
  }

  save() {
    return {
      characterSlug: this.data.characterSlug,
      moveId: this.data.moveId,
    };
  }

  validate() {
    if (!this.data.moveId) return false;
    if (!this.data.characterSlug) return false;

    return true;
  }
}
