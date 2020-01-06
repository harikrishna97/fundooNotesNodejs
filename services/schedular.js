const modelClassObject=require('../app.js/model/note')
const moment = require('moment');


class SchedularClass{   

    /**
     * @description API to add schedular for Reminders
     */
    notificationServiceForRemainder(){
        // new Date() will return :: Sat Jan 04 2020 16:35:03 GMT+0530 (India Standard Time)
                // var today = new Date();
                // // console.log(' Date Format',today.getTime());
                
                // var dd = String(today.getDate()).padStart(2, '0');
                // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                // var yyyy = today.getFullYear();
                // today = dd + '/' + mm + '/' + yyyy;

                var now = new Date();
                // console.log('now :: ',now);

                // var dateString = moment(now).format('YYYY-MM-DD');
                // console.log('dateString :: ',dateString);
                // var dateStringWithTime = moment(now).format('YYYY-MM-DD HH:mm:ss');
                var dateStringWithTime = moment(now).format('YYYY-MM-DD h:mm:ss a');

                console.log('Todays Date and current Time :: ',dateStringWithTime);
                // console.log(today);
                return new Promise((resolve,reject)=>{
                    modelClassObject.readNotes({'remainder':dateStringWithTime},{'title':1,'description':1})
                    .then(data=>{
                        if(data!==null){
                            data.forEach(remainder => console.log('remainder :: ',remainder));
                            // resolve(data)
                        }else{
                            reject(data)
                        }                   
                    })
                    .catch(err=>{
                        reject(err)
                    })
                })
    }    
    
}

module.exports=new SchedularClass;