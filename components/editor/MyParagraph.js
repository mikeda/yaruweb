//@ts-ignore
import Paragraph from '@editorjs/paragraph';

export class MyParagraph extends Paragraph {
  settingWrapper = document.createElement('div');

  renderSettings() {
    this.renderMainSettings();

    return this.settingWrapper;
  }

  static get sanitize() {
    return {
      text: {
        br: true,
        span: true,
      },
    };
  }

  renderMainSettings() {
    if (!this.mainSettingButtons) {
      this.mainSettingButtons = [
        this.makeSettingButton({
          name: '十字キー',
          icon: 'icf_arrow_9',
          onClick: () => this.renderSettingKeyButtons(),
        }),
        this.makeSettingButton({
          name: 'ボタン',
          icon: 'icf_lp',
          onClick: () => this.renderSettingAttackButtons(),
        }),
      ];
    }

    this.settingWrapper.innerHTML = '';
    this.mainSettingButtons.forEach(button => this.settingWrapper.appendChild(button));
  }

  renderSettingKeyButtons() {
    this.settingWrapper.innerHTML = '';
    this.settingWrapper.appendChild(this.settingBackButton);
    this.settingKeyButtons.forEach(button => this.settingWrapper.appendChild(button));
  }

  renderSettingAttackButtons() {
    this.settingWrapper.innerHTML = '';
    this.settingWrapper.appendChild(this.settingBackButton);
    this.settingAttackButtons.forEach(button => this.settingWrapper.appendChild(button));
  }

  get settingBackButton() {
    if (!this._settingBackButton) {
      this._settingBackButton = this.makeSettingButton({
        name: '戻る',
        icon: 'icf_browser_back',
        onClick: () => this.renderMainSettings(),
      });
      this._settingBackButton.style.display = 'block';
    }

    return this._settingBackButton;
  }

  get settingKeyButtons() {
    this._settingKeyButtons ||= [
      'icf_arrow_7',
      'icf_arrow_8',
      'icf_arrow_9',
      'icf_arrow_4',
      'icf_star_blank',
      'icf_arrow_6',
      'icf_arrow_1',
      'icf_arrow_2',
      'icf_arrow_3',
      'icf_arrow_7h',
      'icf_arrow_8h',
      'icf_arrow_9h',
      'icf_arrow_4h',
      'icf_arrow_6h',
      'icf_arrow_1h',
      'icf_arrow_2h',
      'icf_arrow_3h',
    ].map(icon =>
      this.makeSettingButton({
        icon,
        onClick: () => {
          this.data = {
            text: `${this.data.text}<span class="icf ${icon}">&nbsp;</span>`,
          };
        },
      }),
    );

    return this._settingKeyButtons;
  }

  get settingAttackButtons() {
    this._settingAttackButtons ||= [
      { name: 'LP', icon: 'icf_lp' },
      { name: 'RP', icon: 'icf_rp' },
      { name: 'LK', icon: 'icf_lk' },
      { name: 'RK', icon: 'icf_rk' },
      { name: '両P', icon: 'icf_lp_rp' },
      { name: '両K', icon: 'icf_lk_rk' },
      { name: 'LP+LK', icon: 'icf_lp_lk' },
      { name: 'RP+RK', icon: 'icf_rp_rk' },
      { name: 'LP+RK', icon: 'icf_lp_rk' },
      { name: 'RP+LK', icon: 'icf_rp_lk' },
      { name: '全部', icon: 'icf_lp_rp_lk_rp' },
    ].map(({ icon }) =>
      this.makeSettingButton({
        icon,
        onClick: () => {
          this.data = {
            text: `${this.data.text}<span class="icf ${icon}">&nbsp;</span>`,
          };
        },
      }),
    );

    return this._settingAttackButtons;
  }

  makeSettingButton({ name, icon, onClick }) {
    let button = document.createElement('div');
    button.classList.add('cdx-settings-button');
    button.innerHTML = `<span class="icf ${icon}"></span>`;
    button.addEventListener('click', () => onClick());
    if (name) this.api.tooltip.onHover(button, name, { placement: 'top', hidingDelay: 500 });

    return button;
  }
}
