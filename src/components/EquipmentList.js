import React, { useEffect, useMemo, useState } from 'react';
import './EquipmentList.css';
import rentals from '../assets/sheet/rentals.csv';

const getRentalData = async () => {
  let formattedData = {};

  const res = await fetch(rentals);
  const data = await res.text();

  const csv = data.split('\n');
  for (let line = 1; line < csv.length; line++) {
    let parsed_string = csv[line];
    const double_quote_delimiter = '%val=double_quote%';
    parsed_string = parsed_string.replace(/""/g, double_quote_delimiter);

    parsed_string = parsed_string.match(/([^\",]*|(\"[^\"]*\")*)+/gm);

    for (let i = 0; i < parsed_string.length; i++) {
      parsed_string[i] = parsed_string[i].replace(/"/g, '');
      const num_double_quotes =
        parsed_string[i].split(double_quote_delimiter).length - 1;
      if (num_double_quotes > 0) {
        for (let j = 0; j < num_double_quotes; j++) {
          parsed_string[i] = parsed_string[i].replace(
            double_quote_delimiter,
            '"'
          );
        }
      }
    }

    let result = [];
    for (let i = 0; i < parsed_string.length; i += 2) {
      result.push(parsed_string[i]);
    }

    // Store formatted line into global formattedData variable
    if (formattedData[result[1]] == undefined) {
      formattedData[result[1]] = [];
    }
    formattedData[result[1]].push(result);
  }
  return formattedData;
};

const EquipmentItem = props => {
  return (
    <>
      <div className="rental-container">
        <span className="display-text">
          {props.product ? `${props.product}` : 'Product'}
        </span>
        <span className="description">
          {/* &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; */}
          {props.desc ? props.desc : ''}
        </span>
      </div>
    </>
  );
};

const CategoryContainer = props => {
  const [showState, setShowState] = useState();
  useMemo(() => {
    setShowState(props.show);
  }, []);

  return (
    <>
      <div
        className={props.sub ? 'sub-drop-container' : 'drop-container'}
        onClick={() => {
          setShowState(!showState);
        }}
      >
        <span className="display-text">
          &nbsp;&nbsp;&nbsp;
          {showState ? (
            <i class="fa fa-angle-right" style={{ cursor: 'pointer' }}></i>
          ) : (
            <i class="fa fa-angle-down" style={{ cursor: 'pointer' }}></i>
          )}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {props.category ? `${props.category}` : 'Miscellaneous'}
        </span>
      </div>

      {showState ? props.items : null}
    </>
  );
};

const EquipmentList = () => {
  const [jsxData, setJsxData] = useState();

  const handleScroll = () => {
    // Fade in/ out the rental elements to remove navbar collision
    const cats = Array.from(document.querySelectorAll('.drop-container'));
    const subCats = Array.from(
      document.querySelectorAll('.sub-drop-container')
    );
    const rentals = Array.from(document.querySelectorAll('.rental-container'));
    const all = [cats, subCats, rentals];
    for (const arr of all) {
      for (const el of arr) {
        if (el.getBoundingClientRect().y < 100) {
          el.style.opacity = '0';
        } else {
          el.style.opacity = '1';
        }
      }
    }
  };

  useEffect(() => {
    document
      .querySelector('.rentals-page-container')
      .addEventListener('scroll', handleScroll);

    // document.querySelector('.page-container').style.backgroundColor = '#181818';
    // for (const el of navLinks) {
    //   el.style.color = 'white';
    // }
  }, []);

  useMemo(() => {
    getRentalData().then(values => {
      let jsxBuffer = [];

      const categories = Object.keys(values);

      // Generate jsx based on csv data
      for (let i = 0; i < categories.length; i++) {
        // let itemBuffer = [];
        let subCatBuffer = [];
        let subCatGroupingBuffer = {};
        const key = categories[i];
        for (let j = 0; j < values[key].length; j++) {
          // console.log(`j: ${values[key][j]}`);
          if (subCatGroupingBuffer.hasOwnProperty(values[key][j][2])) {
            subCatGroupingBuffer[values[key][j][2]].push(
              <EquipmentItem product={values[key][j][0]} desc={''} />
            );
          } else {
            subCatGroupingBuffer[values[key][j][2]] = [
              <EquipmentItem product={values[key][j][0]} desc={''} />,
            ];
          }

          // previous single nested implementation
          // itemBuffer.push(
          //   <EquipmentItem
          //     product={values[key][j][0]}
          //     subcat={values[key][j][2]}
          //     desc={''}
          //   />
          // );
        }
        for (const key in subCatGroupingBuffer) {
          subCatBuffer.push(
            <CategoryContainer
              sub={true}
              category={key}
              show={false}
              items={subCatGroupingBuffer[key]}
            />
          );
        }

        jsxBuffer.push(
          <CategoryContainer category={key} show={false} items={subCatBuffer} />
        );
      }

      setJsxData(jsxBuffer);
    });
  }, []);

  return (
    <>
      {/* <div className="nav-space"></div> */}
      <div className="rentals-page-container">
        {jsxData}
        <div className="bottom-margin"></div>
      </div>
    </>
  );
};

export default EquipmentList;
