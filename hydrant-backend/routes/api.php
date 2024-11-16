<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function (Request $request) {
    return response()->json([
        'status' => 'ok',
    ]);
});

Route::post('/hydrants/{id}/like', function ($id) {
    $hydrants = [
        1 => [
            'name' => 'Big Red Hydrant',
            'comments' => ['Spot is amazing!', 'Love sniffing here.'],
        ],
        2 => [
            'name' => 'Shady Oak Park',
            'remarks' => ['Great park for running!', 'Cool and shady.'],
        ],
    ];

    if (!isset($hydrants[$id])) {
        return response()->json(['error' => 'Hydrant not found.'], 404);
    }

    $hydrant = $hydrants[$id];

    // Intentional error: Access the wrong key
    return response()->json([
        'name' => $hydrant['name'],
        'comments' => $hydrant['comments'],
    ]);
});
