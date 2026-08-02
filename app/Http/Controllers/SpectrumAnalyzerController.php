<?php

namespace App\Http\Controllers;

use App\Model\Spectrum;
use Illuminate\Http\Request;

class SpectrumAnalyzerController extends Controller
{
    //
    public function index()
    {
        return response()->streamJson([
            'spectra' => Spectrum::with('samples', 'status')->cursor()->map(function ($spectrum) {
                return [
                    'id' => $spectrum->id,
                    'samples' => $spectrum->samples,
                    'status' => $spectrum->status->name
                ];
            }),
        ]);
    }
}
