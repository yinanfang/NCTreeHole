
<?php

require_once 'RenrenRestApiService.class.php';

echo $res["get it"];

if($_POST['status']==""){
echo"can't be none";
exit();
}

$restApi = new RenrenRestApiService;
$params = array('status'=>$_POST['status'],'access_token'=>'236127|6.e575f52c41ec394efd2711762ce725e3.2592000.1375671600-308721944','page_id'=>'601749323');
$res = $restApi->rr_post_curl('pages.setStatus', $params);


echo $res["result"];


?>
