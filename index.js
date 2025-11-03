const getColorSchemeBtn = document.getElementById('get-color-scheme')
const colorSchemePicker = document.getElementById('color-scheme-picker')
const colorContainer = document.getElementById('color-container')
const input = document.getElementById('color-input')
const toggleBackgroundBtn = document.querySelector('.toggle-bg')

getColorSchemeBtn.addEventListener('click', fetchFromApi)

toggleBackgroundBtn.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark-bg')
    document.body.classList.toggle('dark-bg')
    getColorSchemeBtn.classList.toggle('dark-btn')
    toggleBackgroundBtn.classList.toggle('dark-btn')
    const hexValue = document.querySelectorAll('.hex-value')
    hexValue.forEach(text => {
        text.classList.toggle('toggle-text')
    })
})

function fetchFromApi() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${input.value.slice(1)}&format=json&mode=${colorSchemePicker.value}&count=6`)
        .then(res => res.json())
        .then(data => {
            if (colorContainer.hasChildNodes()) {
                colorContainer.innerHTML = ''
            }

            const container = document.createElement('div')
            const colors = document.createElement('img')

            data.colors.forEach(color => {
                const singleColor = document.createElement('div')
                singleColor.style.backgroundColor = color.hex.value
                singleColor.classList.add('single-color')
                const singleColorContainer = document.createElement('div')
                singleColorContainer.classList.add('single-color-container')
                const hexValue = document.createElement('p')
                hexValue.innerHTML = color.hex.value
                hexValue.classList.add('hex-value')
                singleColorContainer.appendChild(singleColor)
                singleColorContainer.appendChild(hexValue)
                container.appendChild(singleColorContainer)
                container.classList.add('container')
                colorContainer.appendChild(container)
            })
        })
}

fetchFromApi()