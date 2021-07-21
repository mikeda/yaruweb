import * as Yup from 'yup';

export const UserValidator = {
  email: Yup.string().email('メールアドレスの形式が正しくありません。').required('メールアドレスを入力して下さい。'),
  name: Yup.string()
    .min(3, 'プレイヤー名は3文字以上で入力してください。')
    .max(16, 'プレイヤー名は16文字以内で入力してください。')
    .required('プレイヤー名を入力して下さい。'),
  slug: Yup.string()
    .min(3, 'プレイヤーIDは3文字以上で入力してください。')
    .max(16, 'プレイヤーIDは16文字以内で入力してください。')
    .matches(/^[a-z][a-z0-9_]*[a-z0-9]$/, '半角英数字(小文字)かアンダースコア(_)のみ使用できます。')
    .required('プレイヤーIDを入力して下さい。'),
  password: Yup.string()
    .min(8, 'パスワードは8文字以上で入力してください。')
    .max(32, 'パスワードは32文字以内で入力してください。')
    .matches(/^[a-zA-Z0-9!-/:-@\[-`{-~]*$/, 'パスワードは半角英数記号で入力してください。')
    .required('パスワードを入力して下さい。'),
};
