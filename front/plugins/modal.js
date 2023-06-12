export function showModal(title, content, closeBtnText = 'Close', saveBtnText = null) {
  const modal = document.createElement('div')
  const modalDialog = document.createElement('div')
  const modalContent = document.createElement('div')
  const modalHeader = document.createElement('div')
  const modalTitle = document.createElement('h5')
  const modalCloseBtnCross = document.createElement('button')
  const modalCloseBtn = document.createElement('button')
  const modalBody = document.createElement('div')
  const modalFooter = document.createElement('div')
  const modalBg = document.createElement('div')

  modal.classList.add('modal')
  modal.setAttribute('tabindex', '-1')
  modalBg.classList.add('modal-bg')
  modalBg.setAttribute('data-bs-dismiss', 'modal')
  modalDialog.classList.add('modal-dialog')
  modalContent.classList.add('modal-content')
  modalHeader.classList.add('modal-header')
  modalTitle.classList.add('modal-title')
  // modalTitle.setAttribute('id', 'modalLabel')
  modalCloseBtnCross.classList.add('btn-close')
  modalCloseBtnCross.setAttribute('type', 'button')
  modalCloseBtnCross.setAttribute('data-bs-dismiss', 'modal')
  modalCloseBtnCross.setAttribute('aria-label', 'Close')
  modalBody.classList.add('modal-body')
  modalFooter.classList.add('modal-footer')
  modalCloseBtn.classList.add('btn')
  modalCloseBtn.classList.add('btn-danger')
  modalCloseBtn.setAttribute('data-bs-dismiss', 'modal')
  modalCloseBtn.innerText = closeBtnText
  modalTitle.innerText = title
  if (typeof content === 'string') modalBody.innerHTML = content
  if (typeof content === 'object') modalBody.appendChild(content)

  modalHeader.appendChild(modalTitle)
  modalHeader.appendChild(modalCloseBtnCross)
  modalContent.appendChild(modalHeader)
  modalContent.appendChild(modalBody)
  modalFooter.appendChild(modalCloseBtn)
  if (saveBtnText) {    
    const modalSaveBtn = document.createElement('button')

    modalSaveBtn.classList.add('btn')
    modalSaveBtn.classList.add('btn-primary')
    modalSaveBtn.innerText = saveBtnText

    modalFooter.appendChild(modalSaveBtn)
  }
  modalContent.appendChild(modalFooter)
  modalDialog.appendChild(modalContent)
  modal.appendChild(modalBg)
  modal.appendChild(modalDialog)
  document.body.appendChild(modal)

  document.querySelectorAll('[data-bs-dismiss="modal"]').forEach((element) => {
    element.addEventListener('click', () => {
      document.body.removeChild(modal)
    })
  })

  // <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
  //   <div class="modal-dialog">
  //     <div class="modal-content">
  //       <div class="modal-header">
  //         <h5 class="modal-title" id="modalLabel">Modal title</h5>
  //         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //       </div>
  //       <div class="modal-body">
  //         <p>Modal body text goes here.</p>
  //       </div>
  //       <div class="modal-footer">
  //         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  //         <button type="button" class="btn btn-primary">Save changes</button>
  //       </div>
  //     </div>
  //   </div>
  // </div>
}

export function removeAllModals() {
  document.querySelectorAll('.modal').forEach((element) => {
    console.log(element)
    document.body.removeChild(element)
  })
}