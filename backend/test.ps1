# Clear any old tokens
$global:authToken = $null

Write-Host "=== Testing Complete Auth Flow ===" -ForegroundColor Cyan
# 1. First, register/login to get token
$login = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method Post `
    -Body '{"email":"john@example.com","password":"123456"}' `
    -ContentType "application/json"

$token = $login.token
$headers = @{Authorization = "Bearer $token" }

# 2. Create student profile
$profileData = @{
    dateOfBirth      = "2000-01-01"
    gender           = "male"
    phone            = "+1234567890"
    address          = @{
        street  = "123 Main St"
        city    = "New York"
        state   = "NY"
        zipCode = "10001"
        country = "USA"
    }
    guardian         = @{
        name         = "John Doe Sr"
        relationship = "Father"
        phone        = "+0987654321"
        email        = "father@example.com"
    }
    emergencyContact = @{
        name         = "Jane Doe"
        relationship = "Mother"
        phone        = "+1122334455"
    }
    bloodGroup       = "O+"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/students/profile" `
    -Method Post `
    -Headers $headers `
    -Body $profileData `
    -ContentType "application/json"

# 3. Get student profile
Invoke-RestMethod -Uri "http://localhost:5000/api/students/profile" `
    -Method Get `
    -Headers $headers

# 4. First, create a course (as admin) - we'll add admin routes later
# For now, manually add to database or skip to #5

# 5. Enroll in course (replace COURSE_ID with actual ID from DB)
Invoke-RestMethod -Uri "http://localhost:5000/api/students/enroll" `
    -Method Post `
    -Headers $headers `
    -Body '{"courseId":"ACTUAL_COURSE_ID_HERE"}' `
    -ContentType "application/json"

# 6. Get enrolled courses
Invoke-RestMethod -Uri "http://localhost:5000/api/students/courses" `
    -Method Get `
    -Headers $headers
Write-Host "`n=== Test Complete ===" -ForegroundColor Cyan