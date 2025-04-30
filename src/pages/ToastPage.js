


/*  Librerias y componentes    */
import React from "react"

function ToastPage() {
  const handleClick = () => {
    alert("Esta función aún no se encuentra implementada.")
  }

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button onClick={handleClick}>
        Show alert
      </button>
    </div>
  )
}

export default ToastPage
