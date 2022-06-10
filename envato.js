console.log('starting envato script')

(()=>{
    const assetsSelector = '[data-test-selector="item-card"]'
    const downloadButtonSelector = '[data-test-selector="item-card-download-button"]'
    const collectionSelector = '[data-test-selector="existing-project-name"]'
    const finalButtonSelector = '[data-test-selector="project-add-and-download-button"]'

    const assets = Array.from(document.querySelectorAll(assetsSelector))

    const store = {
        downloadButton: null,
    }

    Array.from(assets).forEach((asset)=>{
        asset.addEventListener('mouseenter', (event)=>{
            const downloadButton = asset.querySelector(downloadButtonSelector)
            store.downloadButton = downloadButton
        }
        )
    }
    )

    document.addEventListener('keydown', (event)=>{
        console.log('...', event.code)
        if (event.code === 'KeyD') {
            console.log(store.downloadButton)
            store.downloadButton.click()

            setTimeout(()=>{
                const collection = document.querySelector(collectionSelector)
                collection.click()

                const finalButton = document.querySelector(finalButtonSelector)
                finalButton.click()
            }
            , 500)
        }
    }
    )

    setInterval(()=>console.log(store.downloadButton), 1000)

}
)()

automaNextBlock({})
