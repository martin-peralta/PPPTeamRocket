import React from "react"
// npm install react-router-dom

function ToastPage() {
  const handleClick = () => {
    alert("Esta función aún no se encuentra implementada.")
  }

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button onClick={handleClick}>
        Mostrar Alerta
      </button>
    </div>
  )
}

export default ToastPage
