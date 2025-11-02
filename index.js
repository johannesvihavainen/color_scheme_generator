const picker = document.getElementById('colorPicker')
const value = document.getElementById('colorValue')
const select = document.getElementById('modeSelect')
const getColorSchemeBtn = document.getElementById('btn')
const colorsContainer = document.getElementById('colors-container')
const toggleBackgroundBtn = document.getElementById('change-bg')

toggleBackgroundBtn.addEventListener('click', toggleBackground)

function toggleBackground() {
document.body.classList.toggle('dark-mode')
document.documentElement.classList.toggle('dark-mode')
}

select.addEventListener('change', function () {
    console.log(select.value)
})

getColorSchemeBtn.addEventListener('click', fetchFromApi)

function fetchFromApi() {
    const baseColor = picker.value.slice(1)
    const mode = select.value
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${mode}&count=6&format=json`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            colorsContainer.innerHTML = ''

            const colorsRow = document.createElement('div')
            colorsRow.classList.add('colors-row')

            const hexRow = document.createElement('div')
            hexRow.classList.add('hex-row')

            data.colors.forEach(color => {
                const block = document.createElement('div')
                block.classList.add('color-block')
                block.style.backgroundColor = color.hex.value
                colorsRow.appendChild(block)

                const hex = document.createElement('p')
                hex.classList.add('hex-code')
                hex.textContent = color.hex.value
                hexRow.appendChild(hex)
            })

            colorsContainer.appendChild(colorsRow)
            colorsContainer.appendChild(hexRow)
        })
}


fetchFromApi()