<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class BitcoinPriceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $startDate = $request->startDate;
        $endDate = $request->endDate;

        $dayBitcoinPriceArray = array ();

        // Create a new Guzzle Plain Client
        $client = new Client();

        // Define the Request URL of the API with the providen parameters
       $requestURL = "https://api.coindesk.com/v1/bpi/historical/close.json?start=$startDate&end=$endDate&index=[USD]";
        // Execute the request
        $singleCurrencyRequest = $client->request('GET', $requestURL,['verify' => false]);
        
        // Obtain the body into an array format.
        $body = json_decode($singleCurrencyRequest->getBody() , true);

        // If there were some error on the request, throw the exception
        if(array_key_exists("error" , $body)){
            throw $this->createNotFoundException(sprintf('Bitcoin  Day-Price Error: $s', $body["error"]));
        }

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

      return json_encode($dayBitcoinPriceArray);
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
