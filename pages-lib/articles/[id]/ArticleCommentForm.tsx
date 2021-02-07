import React from 'react';

interface Props {
  articleId: string;
  currentPlayer: {
    name: string;
    avatarUrl: string;
  };
}

export const ArticleCommentForm: React.FC<Props> = ({ articleId, currentPlayer }) => {
  return (
    <div className="bl_comment">
      <div className="bl_comment_avatar">
        <img src={currentPlayer.avatarUrl} />
      </div>
      <div className="bl_comment_cont">
        <form action={`/articles/${articleId}/comments`} method="post" className="bl_commentForm">
          <textarea
            name="article_comment[message]"
            required
            rows={4}
            className="el_form_input"
            placeholder="メッセージを入力"
          ></textarea>
          <div className="bl_commentForm_footer">
            <input type="submit" value="コメントする" className="el_btn" />
          </div>
        </form>
      </div>
    </div>
  );
};
