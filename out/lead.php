<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || empty($data['email']) || empty($data['fullName'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit();
}

$to = 'rohan@finnpulse.com';
$subject = 'New CFO Discovery Meeting Request from ' . $data['fullName'] . ' (' . ($data['company'] ?? 'N/A') . ')';

$challenges = is_array($data['challenges']) ? implode(', ', $data['challenges']) : ($data['challenges'] ?? 'None');

$messageBody = "New CFO Discovery Meeting Request:\n\n";
$messageBody .= "• Full Name: " . $data['fullName'] . "\n";
$messageBody .= "• Company Name: " . ($data['company'] ?? 'N/A') . "\n";
$messageBody .= "• Designation: " . ($data['designation'] ?? 'N/A') . "\n";
$messageBody .= "• Mobile Number: " . ($data['mobile'] ?? 'N/A') . "\n";
$messageBody .= "• Email: " . $data['email'] . "\n";
$messageBody .= "• Annual Turnover: " . ($data['turnover'] ?? 'N/A') . "\n";
$messageBody .= "• Industry: " . ($data['industry'] ?? 'N/A') . "\n";
$messageBody .= "• Finance Challenges: " . $challenges . "\n";
$messageBody .= "• Additional Notes: " . ($data['message'] ?? 'N/A') . "\n\n";
$messageBody .= "Submitted from finnpulse.com on " . date('Y-m-d H:i:s') . "\n";

$headers = "From: Finnpulse Website <noreply@finnpulse.com>\r\n";
$headers .= "Reply-To: " . $data['email'] . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$mailSent = @mail($to, $subject, $messageBody, $headers);

echo json_encode(['ok' => true, 'recipient' => $to, 'mailed' => $mailSent]);
?>
