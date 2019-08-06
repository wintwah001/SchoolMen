function getConfirmation() {
               var retVal = confirm("Do you want to delete ?");
               if( retVal == true ) {
                  //function will work here
                  return true;
               }
               else {
                  //
                  return false;
               }
            }