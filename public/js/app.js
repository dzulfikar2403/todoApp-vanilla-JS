window.addEventListener("DOMContentLoaded", () => {
  let inputValue = document.getElementById("inputText");
  let removeAll = document.getElementById("removeAll");
  let UlMainList = document.getElementById("main-list");
  let liNew, pLogo, spanText, divNew, spanEdit, spanRemove;

  window.addEventListener("keyup", (e) => {
    if (e.key === "/" && e.ctrlKey) {
      e.preventDefault(); // untuk mematikan event bawaan dari browser
      inputValue.focus();
    }

    if (e.key === "Enter") {
      mainFunc();
    }
  });

  window.addEventListener("click", (e, i) => {
    if (e.target.id === "singleRemoveClick") {
      e.target.parentElement.parentElement.parentElement.remove();
      setData();
    }
    if (e.target.id === "editClick") {
      let newVal = e.target.parentElement.parentElement.previousElementSibling;
      let ChangeValue = document.getElementById("ChangeValue");
      let cancelChange = document.getElementById("cancelChange");
      let confirmChange = document.getElementById("confirmChange");
      let ChangeSpanText = document.getElementById("ChangeSpanText");

        ChangeSpanText.classList.toggle("editShow");
        ChangeValue.focus();
        cancelChange.addEventListener('click',()=>{
          ChangeValue.blur();
          ChangeSpanText.classList.remove("editShow");
          setData()
        });

        confirmChange,addEventListener('click',()=>{
          ChangeValue.blur();
          ChangeSpanText.classList.remove("editShow");
          
          newVal.textContent = ChangeValue.value;
          // ChangeValue.value = ''
          setData();
        });
    }

    if (e.target.id === "addValue") mainFunc();

    if (e.target.tagName === "LI") {
      e.target.children[0].classList.toggle("activated");
      e.target.children[1].classList.toggle("checked");
      setData();
    }

    if (e.target.id === "text") {
      // e.stopPropagation()
      e.target.previousElementSibling.classList.toggle("activated");
      e.target.classList.toggle("checked");
      setData();
    }
  });

  let mainFunc = () => {
    if (!inputValue.value) {
      let alertShow = document.getElementById("Alert");
      let confirmAlert = document.getElementById("confirmAlert");
      alertShow.classList.add("alertShow");
      confirmAlert.addEventListener("click", () => {
        alertShow.classList.remove("alertShow");
      });
    } else {
      liNew = document.createElement("li");
      pLogo = document.createElement("p");
      spanText = document.createElement("span");
      divNew = document.createElement("div");
      spanEdit = document.createElement("span");
      spanRemove = document.createElement("span");

      spanText.textContent = inputValue.value;
      // pLogo.setAttribute('for','text');
      spanEdit.innerHTML = '<span id="editClick">✏️</span>';
      spanRemove.innerHTML = '<i id="singleRemoveClick" class="fa-solid fa-trash" style="color: #ed7707;"></i>';
      spanRemove.setAttribute("id", "singleRemove");
      spanEdit.setAttribute("id", "edit");
      spanText.setAttribute("id", "text");
      liNew.appendChild(pLogo);
      liNew.appendChild(spanText);

      divNew.appendChild(spanEdit);
      divNew.appendChild(spanRemove);
      liNew.appendChild(divNew);

      UlMainList.append(liNew);
      inputValue.value = "";
      setData();

      // let saveValue= localStorage.setItem(`inputData`,inputNew.value);
      // if(saveValue){
      //   inputNew.value = localStorage.getItem(`inputData`);;
      // }
    }
  };

  removeAll.addEventListener("click", () => {
    UlMainList.innerHTML = "";
    localStorage.removeItem('keyUl');
  });

  let getData = localStorage.getItem("keyUl");
  let setData = () => {
    localStorage.setItem("keyUl", UlMainList.innerHTML);
  };

  UlMainList.innerHTML = getData;
});
