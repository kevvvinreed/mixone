import './Gallery.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Gallery = () => {
  const [totalPosts, setTotalPosts] = useState(false);

  const GalleryFeed = () => {
    let jsx = [];
    for (let i = 1; i < totalPosts; i++) {
      jsx.push(<div className="img-container"></div>);
      if (i % 3 == 0) {
        jsx.push(<div className="flex-break"></div>);
      }
    }

    // Create invisible boxes for proper visual element alignment
    if (totalPosts % 3 != 0) {
      for (let i = 0; i < totalPosts % 3; i++) {
        jsx.push(<div className="img-placeholder"></div>);
      }
    }
    return jsx;
  };

  const GetMediaList = () => {
    const access_token =
      'IGQVJWTlBqWm9CbjVDWFFTLTZASN24xX09HbDI5UkswVktWMVBGY21tS3IyVUl5QU50VWVDaUNyNEkxX0p1SkxTNTFmeF9RR0hlem5tbVZATbG1PZAnR5UkZAaUmp0Q3pJSTNGckZA4ZA3M1U3V6RnBGOXdjRgZDZD';
    const media_list = axios
      .get(
        `https://graph.instagram.com/me?fields=media&access_token=${access_token}`
      )
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });
    return media_list;
  };

  // Uses too many requests, try a different way
  const GetPosts = async media_id_list => {
    // console.log(media_id_list);
    let media_urls = [];
    for (let i = 0; i < media_id_list.length; i++) {
      //oEmbed https://developers.facebook.com/docs/instagram/oembed/#access-tokens
      // GET oEmbed URLs to pass into below
      //https://www.instagram.com/mixone
      //let post_url = 'https://www.instagram.com/p/CGh-iWDJ2DE/'
      //const oembed_token = '840962113296383|2ad65dff9c5fc416125e8f79e8892a4d'
      //https://graph.facebook.com/v10.0/instagram_oembed?url=${post_url}&access_token=${oembed_token}
      //IGQVJWTlBqWm9CbjVDWFFTLTZASN24xX09HbDI5UkswVktWMVBGY21tS3IyVUl5QU50VWVDaUNyNEkxX0p1SkxTNTFmeF9RR0hlem5tbVZATbG1PZAnR5UkZAaUmp0Q3pJSTNGckZA4ZA3M1U3V6RnBGOXdjRgZDZD
      //`https://graph.instagram.com/${media_id_list[i]}?fields=media_url&access_token=${access_token}`
      const access_token =
        'IGQVJWTlBqWm9CbjVDWFFTLTZASN24xX09HbDI5UkswVktWMVBGY21tS3IyVUl5QU50VWVDaUNyNEkxX0p1SkxTNTFmeF9RR0hlem5tbVZATbG1PZAnR5UkZAaUmp0Q3pJSTNGckZA4ZA3M1U3V6RnBGOXdjRgZDZD';
      const media_url = await axios
        .get(
          `https://graph.instagram.com/${media_id_list[i]['id']}?fields=media_url&access_token=${access_token}`
        )
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(err);
        });
      media_urls.push(media_url['data']['media_url']);
    }
    return media_urls;
  };

  useEffect(async () => {
    // const media_id_list = await GetMediaList();
    // const extracted_media_id_list = media_id_list['data']['media']['data'];
    // console.log(media_id_list);

    let extracted_media_id_list = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
    ];

    setTotalPosts(extracted_media_id_list.length);
  }, []);
  return (
    <>
      <div className="gallery-page-container">
        {/* <div>
          <p style={{ color: 'white' }}>{resData}</p>
        </div> */}
        {totalPosts ? (
          <GalleryFeed />
        ) : (
          <div style={{ opacity: 0 }}>Not loaded</div>
        )}
      </div>
    </>
  );
};

export default Gallery;
