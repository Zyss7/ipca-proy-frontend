import React from "react";

const LoadingWrapper = ({
  children,
  loading,
  texto = "Cargando",
  styles = {},
}) => {
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 75px)",
          overflow: "hidden !important",
          display: "grid",
          alignContent: "center",
          alignItems: "center",
          textAlign: "center",
          ...styles,
        }}>
        <div
          className='lds-spinner'
          style={{ marginLeft: "auto", marginRight: "auto" }}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>{texto}</h1>
      </div>
    );
  }

  if (!loading) {
    return children;
  }
};

export default LoadingWrapper;
