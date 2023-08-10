// import 'antd/dist/antd.css';
import React from 'react';
import { useState, useEffect } from 'react';
import './Update.css';
import dayjs from 'dayjs';
import {DatePicker} from 'antd';
const {RangePicker} = DatePicker;


const UpdatePopUp = () => {

    const [selected, setselected] = useState('day');
    const [selectedperiod , setselectedperiod] = useState('Last');
    const [dates , setdates] = useState();
    const [duration, setduration] = useState();

    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    var finYr = "";
    if (mm > 3) { //
        var nextYr1 = (today.getFullYear() + 1).toString();
        finYr = today.getFullYear().toString() + "-" + nextYr1.charAt(2) + nextYr1.charAt(3);
    } else {
        var nextYr2 = today.getFullYear().toString();
        finYr = (today.getFullYear() - 1).toString() + "-" + nextYr2.charAt(2) + nextYr2.charAt(3);
    }

    const handleUpdate = ()=>{

       var data = {
            trend : selected
       } 
       if(selectedperiod==='Last')
       {
            let v = document.getElementById('last_input').value;
            data['period'] = "Last";
            data['duration'] = v;
            console.log(data);
       }else if(selectedperiod==='Custom'){
            if(dates===undefined)
            {   
                console.log("Date Not Selected");
                return;
            }
            data['period'] = 'Custom days';
            data['from'] = (dates[0].$d);
            data['to'] = (dates[1].$d);
            console.log(data);
       }else if(selectedperiod==='year'){
            data['period'] =  'year';
            data['duration'] = document.getElementById('year_input').value;
            console.log(data);
       }else if(selectedperiod==='Financial Year'){
        data['period'] =  'Financial Year';
        data['duration'] = document.getElementById('financial_year_input').value;
        console.log(data);
        }else if(selectedperiod==='Financial Quarter'){
            data['period'] =  'Financial Quarter';
            data['duration_year'] = document.getElementById('financial_quarter_input_year').value;
            data['duration_month'] = document.getElementById('financial_quarter_input_month').value;
            console.log(data);
        }
        else if(selectedperiod==='Quarter'){
            data['period'] =  'Quarter';
            data['duration_year'] = document.getElementById('quarter_input_year').value;
            data['duration_month'] = document.getElementById('quarter_input_month').value;
            console.log(data);
        }else if(selectedperiod==='Month'){
            data['period'] =  'Month';
            data['duration_year'] = document.getElementById('month_input_year').value;
            data['duration_month'] = document.getElementById('month_input_month').value;
            console.log(data);
        }else if(selectedperiod==='Financial Month')
        {
            data['period'] =  'Financial Month';
            data['duration_year'] = document.getElementById('financial_input_year').value;
            data['duration_month'] = document.getElementById('financial_input_month').value;
            console.log(data);
        }
        return data;

    }
    

    const [datestring , setdatestring] = useState("custom dates");
    useEffect(()=>{
        if(dates===undefined)
            setdatestring('Custom date');
        else{
            let s1 = dates[0].$d.toString().substring(4,10);
            let s2 = dates[1].$d.toString().substring(4,10);
            let str = s1+" - " + s2;
            setdatestring(str);
        }
    }, [dates])

    console.log(dates)
    return (
        <>
            <div className='containers'>
                <div className='set-period'>
                    <p className='header'>Set Period</p>
                </div>
                <div className='formcontainer'>
                    <div className='form'>
                        <h3>SHOW TREND :</h3>
                        <div className='form-item' >
                            <input type="radio" defaultChecked={true} id='day' name='day' onChange={() => { setselected('day') }} />
                            <label className='radiotext'>by Day</label>
                        </div>

                        <div className='form-item' >
                            <input type="radio" id='day' name='day' onChange={() => { setselected('week') }} />
                            <label className='radiotext'>by Week</label>
                        </div>
                        <div className='form-item' >
                            <input type="radio" id='day' name='day' onChange={() => { setselected('month') }} />
                            <label className='radiotext'>by Month</label>
                        </div>
                        <div className='form-item' >
                            <input type="radio" id='day' name='day' onChange={() => { setselected('quarter') }} />
                            <label className='radiotext'>by quarter</label>
                        </div>
                        <div className='form-item' >
                            <input type="radio" id='day' name='day' onChange={() => { setselected('year') }} />
                            <label className='radiotext'>by year</label>
                        </div>
                    </div>


                    <div className='form'>
                        <h3>PERIOD COVERED</h3>
                        {selected!=='year' &&  selected!=='quarter'&& selected!=='month'&&  (
                        <div className='form-item' >
                            <input type="radio" name="period" onClick={()=>{setselectedperiod("Month")}} />
                            <label className='radiotext'>Month</label>
                            <input type="number" id="month_input_month" className='outline-day'  defaultValue={mm} />
                            <input type="number" id="month_input_year" className='outline-day' style={{width:30, marginLeft:5}} defaultValue={yyyy} />
                        </div>
                        )}
                        {selected!=='year' && selected!=="week" && selected!=='day' &&(
                        <div className='form-item' >
                            <input type="radio" id="year_input" name="period" onClick={()=>{setselectedperiod("Year")}}/>
                            <label className='radiotext'>year</label>
                            <input type="number" className='outline-day' style={{width:30, marginLeft:5}} defaultValue={yyyy} />
                        </div>
                        )}
                        {selected!=='year' && selected!=='quarter' && selected!=='month'&& (
                        <div className='form-item' >
                            <input type="radio" name="period" onClick={()=>{setselectedperiod("Financial Month")}}/>
                            <label className='radiotext'>Financial Month</label>
                            <input type="number" id = "financial_input_month" className='outline-day'  defaultValue={mm} />
                            <input type="number" id = "financial_input_year" className='outline-day'  style={{width:30, marginLeft:5}} defaultValue={yyyy} />
                        </div>
                        )}
                        {selected!=='year' && selected!=="week" &&  selected!=='day' && (
                        <div className='form-item' >
                            <input type="radio"  name="period" onClick={()=>{setselectedperiod("Financial Year")}}/>
                            <label className='radiotext' >Financial Year</label>
                            {/* <input type="number" style={{ width: 20, border: 'none', textDecoration: 'underline', textDecorationStyle: 'dashed', textDecorationColor: '#767299' }} placeholder='25' /> */}
                            <input type="number"  id="financial_year_input" className='outline-day'  style={{width:30, marginLeft:5}} defaultValue={yyyy} />
                        </div>
                        )}
                        {(selected !=="quarter"&& selected!=='year') && (
                        <div className='form-item' >
                            <input type="radio" name="period" onClick={()=>{setselectedperiod("Quarter")}}/>
                            <label className='radiotext' >Quarter</label>
                            <input type="number"  id="quarter_input_year" className='outline-day'  defaultValue={mm/4+1} />
                            <input type="number"  id="quarter_input_month" className='outline-day'  style={{width:30, marginLeft:5}}  defaultValue={yyyy} />
                        </div>
                        )}
                        {(selected !=="quarter" && selected!=='year') && (
                        <div className='form-item' >
                            <input type="radio"  name="period" onClick={()=>{setselectedperiod("Financial Quarter")}}/>
                            <label className='radiotext'>Financial Quarter</label>
                            <input type="number" id="financial_quarter_input_month" className='outline-day'  defaultValue={mm/4+1} />
                            <input type="number" id="financial_quarter_input_year" className='outline-day' style={{width:30, marginLeft:2}} defaultValue={yyyy} />
                        </div>
                        )}
                        <div className='form-item' >
                            <input type="radio" name="period" onClick={()=>{setselectedperiod("Last")}}/>
                            <label className='radiotext'>Last</label>
                            {/* <input type="number" className='outline' style={{ width: 20, border: 'none' ,outline: 'none', textDecorationLine: 'underline', textDecorationStyle: 'dashed', textDecorationColor: '#767299' }} placeholder='25' /> */}
                            <input type="number" id='last_input' className='outline-day' style={{width:25}}  defaultValue={25} defaultChecked={selectedperiod==='last'}  />
                            <label style={{margin : 8}}>{selected+'s'}</label>
                            {selected==='day' && (
                            <p className='last-days'>You cannot exceed 365 days</p>
                            )}
                        </div>

                        <div className='dates form-item' >
                            <input type="radio" name="period" onClick={()=>{setselectedperiod("Custom")}}/>
                           
                            <RangePicker  className='range' style={{width:20,height:25,overflow:'hidden'}} onChange={(values)=>{
                                setdates(values)}
                            }/>

                            <label  className='radiotext'>{datestring}</label>
                            
                        </div>


                    </div>
                </div>

                <div className='btnconatainer'>

                    <button className='cancelbtn'>Cancel</button>
                    <button className='updatebtn' onClick={handleUpdate}>Update</button>

                </div>
            </div>


        </>

    );

};

export default UpdatePopUp;