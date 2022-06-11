(() => {
  // well hello
  const assetsSelector = '[data-test-selector="item-card"]'
  const downloadIconSelector = '[data-test-selector="item-card-download-button"]'
  const collectionSelector = '[data-test-selector="existing-project-name"]'
  const downloadButtonSelector = '[data-test-selector="project-add-and-download-button"]'
  const addButtonSelector = '[data-test-selector="collection-action-button-add"]'

  const sleep = (duration) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), duration)
    })
  }

  const getOwnedAssets = () => {
    const ownedAssetsString = localStorage.getItem('ownedAssets')
    return ownedAssetsString?.split('🖤') || []
  }

  const updateOwnedAssets = (downloadId) => {
    const ownedAssets = getOwnedAssets()
    const updatedAssets = [...ownedAssets, downloadId]
    localStorage.setItem('ownedAssets', updatedAssets.join('🖤'))
  }

  const getPageAssets = () => {
    return Array.from(document.querySelectorAll(assetsSelector))
  }

  const store = {
    activeAsset: null,
    downloadIcon: null,
    downloadId: null,
    addIcon: null,
  }

  const checkAssetOwned = (downloadId) => {
    const ownedAssets = getOwnedAssets()
    return ownedAssets.includes(downloadId)
  }

  const indicateOwned = () => {
    getPageAssets().forEach((asset) => {
      const assetLink = asset.querySelector('a[title]')
      const downloadId = assetLink.href
      const ownedAssets = getOwnedAssets()

      if (checkAssetOwned(downloadId)) {
        asset.style.opacity = '10%'
      }
    })
  }

  const initiate = () => {
    const assets = getPageAssets()
    indicateOwned()

    Array.from(assets).forEach((asset) => {
      const assetLink = asset.querySelector('a[title]')
      const downloadIcon = asset.querySelector(downloadIconSelector)
      const addIcon = asset.querySelector('[alt="Add to collection"]')
      const originalBoxShadow = downloadIcon.style.boxShadow
      const originalBorder = downloadIcon.style.border

      const onMouseEnter = () => {
        store.activeAsset = asset
        store.downloadIcon = downloadIcon
        store.downloadId = assetLink.href
        store.addIcon = addIcon

        asset.style.boxShadow = '8px 8px 8px red'
        asset.style.border = '1px solid orange'
      }

      const onMouseLeave = () => {
        store.activeAsset = null
        store.downloadIcon = null
        store.downloadId = null
        store.addIcon = null

        asset.style.boxShadow = originalBoxShadow
        asset.style.border = originalBorder
      }

      asset.addEventListener('mouseenter', onMouseEnter)
      asset.addEventListener('mouseleave', onMouseLeave)
    })

    const handleKeydown = async (event) => {
      if (event.code === 'KeyA') {
        console.log(Object.values(store))
        store.addIcon.click()
        await sleep(400)
        const addButton = document.querySelector(addButtonSelector)
        addButton.click()
        await sleep(100)
        store.addIcon.click()
        await sleep(400)
        return
      }

      if (event.code === 'KeyD') {
        if (checkAssetOwned(store.downloadId)) return
        console.log('downloading')

        store.downloadIcon.click()
        await sleep(400)

        const collection = document.querySelector(collectionSelector)
        const downloadButton = document.querySelector(downloadButtonSelector)

        await sleep(250)
        collection.click()

        await sleep(375)
        downloadButton.click()
        updateOwnedAssets(store.downloadId)
      }
    }

    document.addEventListener('keydown', handleKeydown)
  }

  initiate()

  const url = window.location.href

  setInterval(() => {
    const newUrl = window.location.href
    url !== newUrl && initiate()
  })
})()
