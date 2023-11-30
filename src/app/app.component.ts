import { Component } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    if(Capacitor.getPlatform() !== 'web'){
      this.OneSignalInit();
    }
  }



  // Call this function when your app starts
  OneSignalInit(): void {
    // Uncomment to set OneSignal device logging to VERBOSE  
    // OneSignal.Debug.setLogLevel(6);

    // Uncomment to set OneSignal visual logging to VERBOSE  
    // OneSignal.Debug.setAlertLevel(6);

    // NOTE: Update the init value below with your OneSignal AppId.
    OneSignal.initialize("e06c0f1d-2c1a-4fc4-9439-093d532909e9");


    // let myClickListener = async function (event: any) {
    //   let notificationData = JSON.stringify(event);
    // };
    // OneSignal.Notifications.addEventListener("click", myClickListener);


    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.Notifications.requestPermission(true).then((accepted: boolean) => {
      console.log("User accepted notifications: " + accepted);
    });
  }
}
