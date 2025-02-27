$random = New-Object System.Random

$alphabet = @()
for ($char = 65; $char -le 90; $char++) {
    $alphabet += [char]$char
}

$jsonArray = @()
$k = 0

while ($k++ -lt 1000) {
    $category = $alphabet[$random.Next(0, $alphabet.Length)]
    $value = $random.Next(10, 1001)
    $jsonArray += [pscustomobject]@{ category = $category; value = $value }
}

$json = $jsonArray | ConvertTo-Json -Depth 10
Set-Content -Path "output.json" -Value $json