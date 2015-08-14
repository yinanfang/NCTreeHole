
<?php

require_once '../renren/RenrenRestApiService.class.php';

if($_POST['status']==""){
echo"can't be none";
exit();
}

$restApi = new RenrenRestApiService;
$params = array('status'=>$_POST['status'],'access_token'=>'236127|6.5c9a236e78bf2663be08e7a4538cb24a.2592000.1372777200-308721944','page_id'=>'601749323');
$res = $restApi->rr_post_curl('pages.setStatus', $params);


echo $res["result"];


?>

