<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
//use GuzzleHttp\Exception\ClientException;
//use GuzzleHttp\Exception\ServerException;
//use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Psr7;

class BitcoinPriceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       // $startDate = $request->startDate;
       //$endDate = $request->endDate;

       // $startDate = "2021-10--26";
      //$endDate = "2021-11-04";
           
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Get the start and end Dates (From the Frontend)
        $startDate = $request->startDate;
        $endDate = $request->endDate;

        if (($startDate != null) and ($endDate != null) and ($startDate !== "" and $endDate !== ""))
        {
                //Array to store Prices per Day provided by the CoinDesk API
                $dayBitcoinPriceArray = array ();

                // Create a new Guzzle Plain Client
                $client = new Client();

                // Define the Request URL of the API with the the dates parameters
            $requestURL = "https://api.coindesk.com/v1/bpi/historical/close.json?start=$startDate&end=$endDate&index=[USD]";
            
            try
            {
                    //Config the Request with some options
                    $singleBitcoinRequest = $client->request('GET', $requestURL,['verify' => false,'timeout' => 20.0,
                    'headers' => [ 'Accept' => 'application/json']]);
                    
                    //Return Success 
                    if ($singleBitcoinRequest->getStatusCode() == 200)
                    {               
                        // Obtain the body into an array format.
                        $body = json_decode($singleBitcoinRequest->getBody() , true);

                        //The days and the Bitcoin prices are provided by the 'bpi' key/field
                        foreach($body as $key=> $value){
                            if($key == "bpi")
                            {
                                foreach($value as $day=> $price)
                                {
                                    array_push($dayBitcoinPriceArray, array(
                                        'day'=> $day,
                                        'price' => $price,
                                    ));              
                                }
                            }                               
                        }
                        //Return the successful result in a Json Format               
                        return json_encode($dayBitcoinPriceArray);             
                    }
                    else{
                    // echo $singleBitcoinRequest->getStatusCode();
                    // echo $singleBitcoinRequest->getBody();
                    }
                }
                //Handle Request Exception
                catch (\GuzzleHttp\Exception\RequestException $e) {
                
                /**
                 * Here we actually catch the instance of GuzzleHttp\Psr7\Response
                 * (find it in ./vendor/guzzlehttp/psr7/src/Response.php) with all
                 * its own and its 'Message' trait's methods.
                 * So you can have: HTTP status code, message, headers and body.
                 * Just check the exception object has the response before.
                 */

                //Also See : https://docs.guzzlephp.org/en/stable/quickstart.html

                    if ($e->hasResponse()) {
                        
                    // echo Psr7\Message::toString($e->getRequest());
                        echo Psr7\Message::toString($e->getResponse());

                        $response = $e->getResponse();
                        $code = $response->getStatusCode();
                        $message = $response->getReasonPhrase();

                        $errorResponse = "{
                                'error':
                                    {
                                        'status'=> 'error',
                                        'code' => $code,
                                        'message' => $message
                                    }                  
                                }";

                        return response()->json($errorResponse);         
                    }
            }   
        }
        else{
            echo " the 'startDate' and 'endDate' mustn't be Null neither Empty";
        }   
   }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
