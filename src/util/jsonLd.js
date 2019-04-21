
const domainName = 'https://www.radio-arcane.com';

export const locationPlace = location => {
   const place = {
      "@type": "Place",
   };

   if (location.title) {
      place.name = location.title;
   }

   if (location.address) {
      place.address = {
         "@type": "PostalAddress",
         addressCountry: 'USA',
         streetAddress: location.address
      };

      if (location.city) {
         place.address.addressLocality = location.city;
      }

      if (location.state) {
         place.address.addressRegion = location.state;
      }

      if (location.zipcode) {
         place.address.postalCode = location.zipcode;
      }
   }

   /*
   let addrParts = ['address', 'address2', 'city', 'state']
   .map(prop => {
      if (location.hasOwnProperty(prop) && location[prop]) {
         return location[prop];
      }

      return null;
   })
   .filter(value => value !== null && value !== '' && value !== false)
   .join(', ');

   if (location.zipcode) {
      addrParts += ' ' + location.zipcode;
   }

   if (addrParts.length) {
      place.address = addrParts.trim();
   }
   */

   if (location.venueLink) {
      place.sameAs = location.venueLink;
   }

   if (location.googleMapLink) {
      place.hasMap = location.googleMapLink;
   }

   return place;
};

export const musicEvent = (event) => {
   const eventSchema = {
      "@context": "https://schema.org",
      "@type" : "MusicEvent",
      name: event.displayName,
      url: `${ domainName }${ event.path }`,
      description: (() => {
         if (event.shortDescription) {
            return event.shortDescription;
         }

         return "Dark Eclectic Music all night featuring our rotating cast of Dark Music Specialists.";
      })()
   };

   if (event.startDatetime) {
      eventSchema.startDate = event.startDatetime.replace(' ', 'T');
   }

   if (event.endDatetime) {
      eventSchema.endDate = event.endDatetime.replace(' ', 'T');
   }

   if (event.image) {
      eventSchema.image = `${ domainName }${ event.image }`;
   }

   if (event.facebookEventLink) {
      eventSchema.sameAs = event.facebookEventLink;
   }

   if (event.location) {
      eventSchema.location = locationPlace(event.location);
   }

   if (event.ticketsLink) {
      eventSchema.offers = {
         "@type": "Offer",
         "url": event.ticketsLink,
      };
   }

   return eventSchema;
};

export default {
   musicEvent,
};
