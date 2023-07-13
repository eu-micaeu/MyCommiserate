import React from "react";
import "./style.css";

export const Apresentao = () => {
  return (
    <div className="apresentao">
      <div className="div">
        <img className="copy-removebg" alt="Copy removebg" src="/img/copy-removebg-preview-1.png" />
        <img className="iconamoon-profile" alt="Iconamoon profile" src="/img/iconamoon-profile-circle-fill.svg" />
        <h1 className="text-wrapper">Olá, Fulano!</h1>
        <div className="overlap">
          <div className="text-wrapper-2">Título</div>
        </div>
        <div className="overlap-group">
          <div className="rectangle" />
          <img className="ic-round-plus" alt="Ic round plus" src="/img/ic-round-plus.svg" />
        </div>
        <div className="rectangle-2" />
      </div>
    </div>
  );
};
