/* eslint-disable import/no-unused-modules */
import { ImageResponse } from '@vercel/og'
import React from 'react'

import getCollection from '../../../../utils/getCollection'
import getColor from '../../../../utils/getColor'
import getSetup from '../../../../utils/getSetup'

export async function onRequestGet({ params, request }) {
  try {
    const { baselMediumFontData, watermark, check } = await getSetup(request)

    const { index } = params
    const collectionAddress = String(index)
    const data = await getCollection(collectionAddress, request.url)
    if (!data) {
      return new Response('Collection not found', { status: 404 })
    }
    const palette = await getColor(data.image)
    const words = data.name.split(' ')

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'black',
            display: 'flex',
            width: '1200px',
            height: '630px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: `rgba(${palette[0]}, ${palette[1]}, ${palette[2]}, 0.75)`,
              padding: '72px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                gap: '48px',
                width: '100%',
              }}
            >
              <img
                src={data.image}
                alt={data.name}
                width="500px"
                height="500px"
                style={{
                  borderRadius: '60px',
                  //boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.25)',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  width: '50%',
                }}
              >
                <div
                  style={{
                    gap: '12px',
                    fontSize: '72px',
                    fontFamily: 'Basel Medium',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    lineHeight: '64px'
                  }}
                >
                  {words.map((word) => (
                    <text key={word}>{word}</text>
                  ))}
                  {data.isVerified && <img src={check} height="54px" style = {{
                    marginBottom: '-2px',
                  }}/>}
                </div>
                <img
                  src={watermark}
                  height="72px"
                  style={{
                    opacity: '0.5',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Basel Medium',
            data: baselMediumFontData,
          },
        ],
      }
    )
  } catch (error) {
    return new Response(error.message || error.toString(), { status: 500 })
  }
}
