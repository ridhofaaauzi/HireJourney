<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    protected $fillable = [
        'user_id',
        'company_name',
        'position',
        'type',
        'source',
        'applied_at',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
