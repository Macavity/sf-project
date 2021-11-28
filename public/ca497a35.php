<?php
ini_set('display_errors', true);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use App\Kernel;
use Symfony\Component\ErrorHandler\Debug;


require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

umask(0000);
Debug::enable();
//var_dump($context['APP_ENV']);

return function (array $context) {
    return new Kernel('dev', true);
};
