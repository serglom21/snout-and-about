<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function (Request $request) {
    return response()->json([
        'status' => 'ok',
    ]);
});

Route::post('/hydrants/{id}/like', function (Request $request,$id) {
    $hydrants = [
        1 => [
            'name' => 'Big Red Hydrant',
            'comments' => ['Spot is amazing!', 'Love sniffing here.'],
        ],
        2 => [
            'name' => 'Shady Oak Park',
            'comments' => ['Great park for running!', 'Cool and shady.'],
        ],
    ];

    if (!isset($hydrants[$id])) {
        return response()->json(['error' => 'Hydrant not found.'], 404);
    }

    $body = $request->all();

    $hydrant = $hydrants[$id];

    try {
        if (array_key_exists($body["keyName"], $hydrant)) {
            $data = [
                $body["keyName"] => $hydrant[$body["keyName"]]
            ];
        } else {
            throw new Exception("Key name: " . $body["keyName"] . " does not exist.");
        }
    } catch (\Throwable $exception) {
        \Sentry\captureException($exception);
        return response()->json(['error' => 'Key not found.'], 404);
    }

    return response()->json($data, 200);
});
