define([
    'utils/helpers',
    'events/events',
    'events/states',
    'underscore'
], function(utils, events, states, _) {

    var noop = utils.noop,
        returnFalse = _.constant(false);

    var DefaultProvider = {
        // This function is required to determine if a provider can work on a given source
        supports : returnFalse,

        // Basic playback features
        play : noop,
        load : noop,
        stop : noop,
        volume : noop,
        mute : noop,
        seek : noop,
        resize : noop,
        remove : noop,  // removes from page
        destroy : noop, // frees memory

        setVisibility : noop,
        setFullscreen : returnFalse,
        getFullscreen : noop,

        // If setContainer has been set, this returns the element.
        //  It's value is used to determine if we should remove the <video> element when setting a new provider.
        getContainer : noop,

        // Sets the parent element, causing provider to append <video> into it
        setContainer : returnFalse,

        isAudioFile : returnFalse,
        supportsFullscreen : returnFalse,

        getName: noop,
        getQualityLevels : noop,
        getCurrentQuality : noop,
        setCurrentQuality : noop,

        getAudioTracks : noop,
        getCurrentAudioTrack : noop,
        setCurrentAudioTrack : noop,

        // TODO :: The following are targets for removal after refactoring
        checkComplete : noop,
        setControls : noop,
        attachMedia : noop,
        detachMedia : noop,

        setState: function(state) {
            var oldState = this.state || states.IDLE;
            this.state = state;

            if (state === oldState) {
                return;
            }

            this.sendEvent(events.JWPLAYER_PLAYER_STATE, {
                oldstate: oldState,
                newstate: state
            });
        }
    };


    // Make available to other providers for extending
    return DefaultProvider;

});
