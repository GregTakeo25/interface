export default async function getSetup(request: Request) {
  const origin = new URL(request.url).origin
  const watermark = origin + '/images/324x74_App_Watermark.png'
  const check = origin + '/images/54x54_Verified_Check.svg'
  const bookUrl = origin + '/fonts/Basel-Book.woff'
  const mediumUrl = origin + '/fonts/Basel-Medium.woff'
  const baselBook = fetch(bookUrl).then((res) => res.arrayBuffer())
  const baselBookFontData = await baselBook
  const baselMedium = fetch(mediumUrl).then((res) => res.arrayBuffer())
  const baselMediumFontData = await baselMedium

  return {
    baselBookFontData,
    baselMediumFontData,
    watermark,
    check,
  }
}
