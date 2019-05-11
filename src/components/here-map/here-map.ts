import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;

@Component({
  selector: 'here-map',
  templateUrl: 'here-map.html'
})
export class HereMapComponent implements OnInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  public appId: any;

  @Input()
  public appCode: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;
  @Input()
  public height: any;
  self = this;
  map=null;
  currentMarker = null;
  platform;
  defaultAddressDescription=null;



  public constructor() { }

  public ngOnInit() { }

  public ngAfterViewInit() {
    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
    let defaultLayers = this.platform.createDefaultLayers();
    
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 7,
        center: { lat: this.lat, lng: this.lng }
      }
    );
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
  }
  setMarkerCenter(lat,lng){
    console.log(lat + "," +lng );
    this.lat = lat;
    this.lng = lng;
    this.map.setCenter({lat,lng});
    this.map.removeObjects(this.map.getObjects())
    this.currentMarker = new H.map.Marker({ lat: lat, lng: lng });
    this.map.addObject(this.currentMarker);
    this.map.setZoom(12);
    console.log(this.lat + "," + this.lng);
    console.log(lat)
  }
  
  addMrkerOnClick() {
  // Attach an event listener to map display
  // obtain the coordinates and display in an alert box.
  console.log(this.map);
  
    this.map.addEventListener("tap", this.addMarker, false,this);
}
  addMarker(evt) {
    console.log(this.map);
    var coord = this.map.screenToGeo(
      evt.currentPointer.viewportX,
      evt.currentPointer.viewportY
    );
    var loc = coord.lat + "," + coord.lng ;
    console.log(loc);
    this.lat = coord.lat;
    this.lng = coord.lng;
    this.map.removeObjects(this.map.getObjects())
    this.currentMarker = new H.map.Marker({ lat: coord.lat, lng: coord.lng });
    this.map.addObject(this.currentMarker);
    this.map.removeEventListener('tap',this.addMarker,false,this);
    this.retrieveAddress(this.lat,this.lng);
  }
  retrieveAddress(lat,lng){
    let location = lat + "," + lng + ",500";
        var geocoder = this.platform.getGeocodingService(),
        reverseGeocodingParameters = {
          prox: location, //'52.5309,13.3847,150', // Berlin
          mode: "retrieveAddresses",
          maxresults: "1",
          language: "fr",
          jsonattributes: 1
        };

    geocoder.reverseGeocode(reverseGeocodingParameters, this.onSuccess, this.onError);
    
  }
  onSuccess = (result) => {
    var location = result.response.view[0].result[0].location;
    var address = location.address;
  /*
   * The styling of the geocoding response on the map is entirely under the developer's control.
   * A representitive styling can be found the full JS + HTML code of this example
   * in the functions below:
   */
      var position = {
        lat: location.displayPosition.latitude,
        lng: location.displayPosition.longitude
      };
  this.defaultAddressDescription = address.label
  
  // ... etc.
}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 */
onError(error) {
  console.log("Ooops! " + error);
}

}