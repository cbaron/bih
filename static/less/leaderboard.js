<div class="row">

    <div class="col-md-4 dashboard-id">
        <div class="row">
            <div class="col-md-6">
                 <div class="upload-photo-btn-wrapper">
                    <div class="upload-photo-btn"></div>
                </div>               
                <div>
                    <span class="glyphicon glyphicon-camera"></span>
                    <span>Upload</span>
                </div>
            </div>
            <div class="col-md-6">
                <div>Hello, {{user.firstName}}!</div>
                <div>Bus #{{bus.number}}</div>
            </div>
        </div>
    </div>
    
    <div class="col-md-2"></div>

    <div class="col-md-6 dashboard-leaderboard">
        <div class="leaderboard-header">4-Week Challenge Leaderboard</div>
        <div data-js="leaderboard-items"></div>
    </div>

</div>

<div class="row">

    <div class="col-md-4">
        <div>100 Point Challenge</div>
        <div>
            <div class="individual-point-display"></div>
            <div class="out-of-display">
                <div>Points out</div>
                <div>of 100</div>
            </div>
        </div>
        <div class="btn">Complete a Challenge!</div>
    </div>
</div>
