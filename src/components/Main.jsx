import React from "react";
import "./Main.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Main = ({ getActiveNote, onUpdateNote }) => {
  if (!getActiveNote) {
    return <div className="no-active-note">ノートが選択されていません</div>;
  }

  const onEditNote = (key, value) => {
    onUpdateNote({
      //スプレッド構文を活用してデータを渡すことで更新されていないデータも含めて戻り値として返すことができる
      ...getActiveNote,
      [key]: value,
      modDate: Date.now(),
    });
  };
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          id="title"
          type="text"
          placeholder="タイトルを記入"
          value={getActiveNote.title}
          className="app-main-note-text"
          onChange={(e) => onEditNote("title", e.target.value)}
        />
        <textarea
          id="content"
          value={getActiveNote.content}
          placeholder="ノート内容を記入"
          className="app-main-note-textarea"
          onChange={(e) => onEditNote("content", e.target.value)}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{getActiveNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {getActiveNote.content}
        </ReactMarkdown>
        <time className="preview-date">
          {new Date(getActiveNote.modDate).toLocaleDateString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
    </div>
  );
};

export default Main;
