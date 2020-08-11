if (!(Test-Path .\.materials)) {
    mkdir .\.materials
}

$CommonPaths = @(
    # Add additional shared paths for each module
    ".\LICENSE",
    ".\README.md"
)

Compress-Archive -DestinationPath .\.materials\Module-4.zip -Update -Path ($CommonPaths + @(
        ".\Module 4"
    ))
Compress-Archive -DestinationPath .\.materials\Module-5.zip -Update -Path ($CommonPaths + @(
        ".\Module 5"
    ))
Compress-Archive -DestinationPath .\.materials\Module-6.zip -Update -Path ($CommonPaths + @(
        ".\Module 6"
    ))
Compress-Archive -DestinationPath .\.materials\Module-7.zip -Update -Path ($CommonPaths + @(
        ".\Module 7"
    ))
Compress-Archive -DestinationPath .\.materials\Module-8.zip -Update -Path ($CommonPaths + @(
        ".\Module 8"
    ))
Compress-Archive -DestinationPath .\.materials\Module-9.zip -Update -Path ($CommonPaths + @(
        ".\Module 9"
    ))
Compress-Archive -DestinationPath .\.materials\Module-10.zip -Update -Path ($CommonPaths + @(
        ".\Module 10"
    ))
