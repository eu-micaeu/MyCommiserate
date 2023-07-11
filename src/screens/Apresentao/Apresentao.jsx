import React from "react";
import "./style.css";

export const Apresentao = () => {
  return (
    <div className="apresentao">
      <div className="div">
        <div className="overlap-group">
          <img
            className="copy-removebg"
            alt="Copy removebg"
            src="https://generation-sessions.s3.amazonaws.com/5e249c5c795311b204d6d7c449645543/img/copy-removebg-preview-1@2x.png"
          />
          <div className="overlap-group">
            <div className="rectangle" />
            <div className="rectangle-2" />
          </div>
          <img
            className="iconamoon-profile"
            alt="Iconamoon profile"
            src="https://generation-sessions.s3.amazonaws.com/5e249c5c795311b204d6d7c449645543/img/iconamoon-profile-circle-fill.svg"
          />
          <h1 className="text-wrapper">Olá, Fulano!</h1>
          <div className="overlap">
            <div className="text-wrapper-2">Título</div>
          </div>
          <div className="ic-round-plus-wrapper">
            <img
              className="ic-round-plus"
              alt="Ic round plus"
              src="https://generation-sessions.s3.amazonaws.com/5e249c5c795311b204d6d7c449645543/img/ic-round-plus.svg"
            />
          </div>
          <img
            className="wpf-qrcode"
            alt="Wpf qrcode"
            src="https://generation-sessions.s3.amazonaws.com/5e249c5c795311b204d6d7c449645543/img/wpf-qrcode.svg"
          />
        </div>
        <div className="rectangle-3" />
      </div>
    </div>
  );
};
